import axios from "axios";
import * as ExcelJS from "exceljs";
import * as dotenv from "dotenv";

dotenv.config();
const key: string = process.env.GCP_KEY || "";

const allAddress: string[] = [
  "Rua Cristóvão Gonçalves, 48",
  "Largo dos pinheiros, 81",
  "Largo dos pinheiros, 75",
];

interface Location {
  lat: number;
  lng: number;
}

async function getCoordinates(address: string): Promise<Location> {
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address: address,
          key,
        },
      }
    );

    if (response.data.results && response.data.results.length > 0) {
      const location: Location = response.data.results[0].geometry.location;
      return location;
    } else {
      throw new Error("Endereço não encontrado ou sem coordenadas.");
    }
  } catch (error: any) {
    console.error(`Erro ao obter coordenadas para ${address}:`, error.message);
    throw error;
  }
}

async function getStreetsInTheArea(
  lat: number,
  lng: number,
  raio: number
): Promise<string[]> {
  try {
    const response = await axios.post(
      "https://overpass-api.de/api/interpreter",
      `
        [out:json];
        way(around:${raio},${lat},${lng})[highway];
        out body;
      `
    );

    const streets: string[] = response.data.elements.map(
      (element: { tags: { name: string } }) => element.tags.name
    );
    return streets;
  } catch (error: any) {
    console.error("Erro ao obter ruas na área:", error.message);
    throw error;
  }
}

async function exportToExcel(
  address: string,
  streets: string[]
): Promise<void> {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(address);

  worksheet.columns = [{ header: "Rua", key: "rua", width: 20 }];

  for (const street of streets) {
    if (street !== undefined && street !== "") worksheet.addRow([street]);
  }

  await workbook.xlsx.writeFile(`./docs/resultados_${address}.xlsx`);
  console.log(`Resultado exportado para resultados_${address}.xlsx`);
}

async function streetsMap(): Promise<void> {
  for (const address of allAddress) {
    try {
      const coord = await getCoordinates(address);

      const streetsInTheArea = await getStreetsInTheArea(
        coord.lat,
        coord.lng,
        500
      );

      const finalResult = Array.from(new Set(streetsInTheArea));

      console.log(
        `Quantidade de endereços para ${address}:`,
        finalResult.length
      );

      await exportToExcel(address, finalResult);
    } catch (error: any) {
      console.error(`Erro ao processar ${address}:`, error.message);
    }
  }
}

streetsMap();

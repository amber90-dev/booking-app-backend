import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import * as xlsx from "xlsx";
import { Booking } from "./booking.entity";

async function run() {
  // const ds = new DataSource({
  //   type: 'postgres',
  //   url: process.env.DATABASE_URL,
  //   entities: [Booking],
  //   synchronize: true,
  //   logging: false,
  // });
  // await ds.initialize();
  // const repo = ds.getRepository(Booking);
  // const path = process.env.BOOKINGS_XLSX || 'BOOKING TABLE.xlsx';
  // const wb = xlsx.readFile(path);
  // const ws = wb.Sheets[wb.SheetNames[0]];
  // const rows: any[] = xlsx.utils.sheet_to_json(ws, { defval: null });
  // const map = (r: any): Partial<Booking> => ({
  //   bookingRef: r['Booking_Ref']?.toString() ?? null,
  //   accountNo: r['Account_No']?.toString() ?? null,
  //   vip: !!r['VIP'],
  //   date: r['Date'] ? new Date(r['Date']).toISOString().slice(0,10) : null,
  //   day: r['Day']?.toString() ?? null,
  //   time: r['Time']?.toString() ?? null,
  //   clientId: r['Client_ID']?.toString() ?? null,
  //   pickUpAddress: r['Pick_Up_Address'] ?? null,
  //   dropOffAddress: r['Drop_Off_Address'] ?? null,
  //   via: r['Via'] ?? null,
  //   contactId: r['Contact_ID']?.toString() ?? null,
  //   staffId: r['Staff_ID']?.toString() ?? null,
  //   driverNo: r['Driver_No']?.toString() ?? null,
  //   vehicle: r['Vehicle']?.toString() ?? null,
  //   cancelled: (r['Cancelled'] ?? '').toString().toLowerCase() in { 'yes':1, 'y':1, 'true':1, '1':1 },
  //   totalClient: r['Client_Total']?.toString() ?? '0',
  //   totalDriver: r['Driver_Total']?.toString() ?? '0',
  //   notes: r['Job_Info'] ?? null,
  // });
  // const batch: Partial<Booking>[] = rows.map(map);
  // // insert in chunks
  // const chunk = 1000;
  // for (let i=0;i<batch.length;i+=chunk) {
  //   await repo.save(batch.slice(i,i+chunk));
  //   console.log(`Imported ${Math.min(i+chunk, batch.length)}/${batch.length}`);
  // }
  // await ds.destroy();
  // console.log('Done');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

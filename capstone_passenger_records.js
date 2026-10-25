let passengers = [
  {
    pnrCode: "VN201",
    passengerName: "TRAN VAN HIEU",
    idNumber: "001095012345",
    flightNumber: "VN-120",
    seatNumber: "12A",
    isCheckedIn: true
  },
  {
    pnrCode: "VN202",
    passengerName: "NGUYEN THI BICH",
    idNumber: "B1234567",
    flightNumber: "VN-120",
    seatNumber: null,
    isCheckedIn: false
  }
];

const availableSeats = ["12B", "12C", "14A", "14B", "14C", "15A", "15B", "15C"];

function validateIdentity(idNumber) {
  if (!idNumber) return false;
  const cleanId = idNumber.trim();
  const isCccd = /^[0-9]{12}$/.test(cleanId);
  const isPassport = /^[A-Za-z][0-9]{7,8}$/.test(cleanId);
  return isCccd || isPassport;
}

function findPassengerByPnr(pnr) {
  return passengers.find(p => p.pnrCode.toUpperCase() === pnr?.trim().toUpperCase());
}

function assignSeat(flightNumber) {
  const occupiedSeats = passengers
    .filter(p => p.flightNumber === flightNumber && p.isCheckedIn && p.seatNumber)
    .map(p => p.seatNumber);

  return availableSeats.find(seat => !occupiedSeats.includes(seat)) || null;
}

function printBoardingPass(p) {
  const line = "=".repeat(48);
  console.log(line);
  console.log("            BOARDING PASS / THE LEN MAY BAY     ");
  console.log(line);
  console.log(`PASSENGER : ${p.passengerName}`);
  console.log(`ID NUMBER : ${p.idNumber}`);
  console.log(`FLIGHT    : ${p.flightNumber}          SEAT : ${p.seatNumber}`);
  console.log(`PNR       : ${p.pnrCode}              GATE : 02`);
  console.log(line);
  console.log("||| | ||||| || |||| |||||| ||| |||| || |||||| ||");
  console.log(`*${p.pnrCode}*${p.flightNumber}*${p.seatNumber}*`);
  console.log(line);
}

function registerPassenger() {
  const pnr = prompt("Nhap ma PNR moi:")?.trim().toUpperCase();
  if (!pnr) return alert("Ma PNR khong duoc de trong!");
  if (findPassengerByPnr(pnr)) return alert("Ma PNR da ton tai tren he thong!");

  const name = prompt("Nhap ho ten hanh khach:")?.trim().toUpperCase();
  if (!name) return alert("Ten hanh khach khong duoc de trong!");

  const idNumber = prompt("Nhap so CCCD (12 so) hoac Ho chieu (1 chu + 7-8 so):")?.trim().toUpperCase();
  if (!validateIdentity(idNumber)) {
    return alert("Giay to tuy than khong hop le theo quy chuan hang khong!");
  }

  const flight = prompt("Nhap so hieu chuyen bay (vi du: VN-120):")?.trim().toUpperCase();
  if (!flight) return alert("So hieu chuyen bay khong hop le!");

  passengers.push({
    pnrCode: pnr,
    passengerName: name,
    idNumber: idNumber,
    flightNumber: flight,
    seatNumber: null,
    isCheckedIn: false
  });

  alert(`Tiep nhan ho so PNR ${pnr} thanh cong!`);
}

function processSecurityCheckIn() {
  const pnr = prompt("Nhap ma PNR can xac thuc & lam thu tuc:")?.trim().toUpperCase();
  const passenger = findPassengerByPnr(pnr);

  if (!passenger) return alert("Khong tim thay ho so hanh khach!");
  if (passenger.isCheckedIn) return alert("Hanh khach nay da check-in va co so ghe!");

  const confirmId = prompt(`Xac nhan lai CCCD/Ho chieu cua ${passenger.passengerName}:`)?.trim().toUpperCase();
  if (confirmId !== passenger.idNumber) {
    return alert("Xac thuc that bai: So giay to khong khop voi ho so goc!");
  }

  const seat = assignSeat(passenger.flightNumber);
  if (!seat) return alert("Chuyen bay da het ghe trong phu hop!");

  passenger.seatNumber = seat;
  passenger.isCheckedIn = true;

  printBoardingPass(passenger);
  alert(`Xac thuc thanh cong! Da cap ghe: ${seat}`);
}

function viewAllRecords() {
  console.log("DANH SACH HO SO HANH KHACH:");
  console.log(passengers);
}

function main() {
  let choice;
  do {
    choice = prompt(
      "HE THONG AN NINH & CHECK-IN HANG KHONG:\n" +
      "1. Xem danh sach ho so\n" +
      "2. Tiep nhan ho so hanh khach moi\n" +
      "3. Xac thuc danh tinh & Cap so ghe (Check-in)\n" +
      "4. Thoat\n" +
      "Nhap lua chon (1-4):"
    );

    switch (choice) {
      case "1":
        viewAllRecords();
        break;
      case "2":
        registerPassenger();
        break;
      case "3":
        processSecurityCheckIn();
        break;
      case "4":
        alert("Ket thuc ca truc an ninh!");
        break;
      default:
        if (choice !== null) alert("Lua chon khong hop le!");
        break;
    }
  } while (choice !== "4" && choice !== null);
}

main();
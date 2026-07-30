// Division mapping
export enum BangladeshDivisions {
  DHAKA = "dhaka",
  CHATTOGRAM = "chattogram",
  RAJSHAHI = "rajshahi",
  KHULNA = "khulna",
  BARISHAL = "barishal",
  SYLHET = "sylhet",
  RANGPUR = "rangpur",
  MYMENSINGH = "mymensingh"
}

export const divisionDistricts: Record<string, string[]> = {
  dhaka: ['dhaka','faridpur','gazipur','gopalganj','kishoreganj','madaripur','manikganj','munshiganj','narayanganj','narsingdi','rajbari','shariatpur','tanga'],
  chattogram: ['bandarban','brahmanbaria','chandpur','chattogram','comilla',"cox's bazar",'feni','khagrachhari','lakshmipur','noakhali','rangamati'],
  rajshahi: ['bogura','chapainawabganj','joypurhat','naogaon','natore','pabna','rajshahi','sirajganj'],
  khulna: ['bagerhat','chuadanga','jashore','jhenaidah','khulna','kushtia','magura','meherpur','narail','satkhira'],
  barishal: ['barguna','barisal','bhola','jhalokati','patuakhali','pirojpur'],
  sylhet: ['habiganj','moulvibazar','sunamganj','sylhet'],
  rangpur: ['dinajpur','gaibandha','kurigram','lalmonirhat','nilphamari','panchagarh','rangpur','thakurgaon'],
  mymensingh: ['jamalpur','mymensingh','netrakona','sherpur'],
};
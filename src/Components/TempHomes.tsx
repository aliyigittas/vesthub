import House2 from "../House2.jpg";
import House3 from "../House3.jpeg";
import H1 from "../homePhotos/home1/1.jpeg";
import H2 from "../homePhotos/home1/2.jpeg";
import H3 from "../homePhotos/home1/3.jpeg";
import H4 from "../homePhotos/home2/1.jpeg";
import H5 from "../homePhotos/home2/2.jpeg";
import H6 from "../homePhotos/home2/3.jpeg";
import H7 from "../homePhotos/home2/4.jpeg";
import H8 from "../homePhotos/home2/5.jpeg";
import H9 from "../homePhotos/home3/1.jpeg";
import H10 from "../homePhotos/home3/2.jpeg";
import H11 from "../homePhotos/home3/3.jpeg";
import H12 from "../homePhotos/home3/4.jpeg";
import H13 from "../homePhotos/home3/5.jpeg";
const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis in metus lacinia fringilla. Sed auctor, justo ac ultricies ultricies, nunc nisl aliquet erat, vel ultricies arcu nunc nec ligula. Sed et turpis in metus lacinia fringilla. Sed auctor, justo ac ultricies ultricies, nunc nisl aliquet erat, vel ultricies arcu nunc nec ligula. Sed et turpis in metus lacinia fringilla. Sed auctor, justo ac ultricies ultricies, nunc nisl aliquet erat, vel ultricies arcu nunc nec ligula. Sed et turpis in metus lacinia fringilla. Sed auctor, justo ac ultricies ultricies, nunc nisl aliquet erat, vel ultricies arcu nunc nec ligula.";

const homes = [
  {
    id: 0,
    title: "Mevlanakapı kara surları arkası Değerli konum 2+1 3.kat Deniz manzaralı önü kapanmaz iskanlı",
    photo: [], //H1, H2, H3
    price: "230.001",
    type: "Sale",
    coordinates: { lat: 41.0082, lng: 28.9784 },
    address: "Mevlanakapı, Fatih/İstanbul, Türkiye",
    ownerMail: "Baran",
    description: loremIpsum,
    keyFeatures: {
      fiberInternet: true,
      airConditioner: true,
      floorHeating: true,
      fireplace: false,
      terrace: true,
      satellite: false,
      parquet: true,
      steelDoor: false,
      furnished: false,
      insulation: false,
    },
  },
  {
    id: 1,
    title: "Direkt Mülkiyet sahibinden kiralık daire",
    photo: [H4, H5, H6, H7, H8],
    price: "18.000",
    type: "Rent",
    coordinates: { lat: 40.3812, lng: 28.9784 },
    address: "Gazi Mustafa Kemal Bulvarı, No: 1, 34100 Fatih/İstanbul, Türkiye",
    ownerMail: "Ali",
    description: loremIpsum,
    keyFeatures: {
      fiberInternet: false,
      airConditioner: false,
      floorHeating: true,
      fireplace: false,
      terrace: false,
      satellite: true,
      parquet: false,
      steelDoor: true,
      furnished: true,
      insulation: false,
    },
  },
  {
    id: 2,
    title: "Sayapark Civarı İSKANLI + DOĞALGAZ+ ANKASTRE + HAVUZLU + JENERATÖRLÜ",
    photo: [H9, H10, H11, H12],
    price: "4.000.000",
    type: "Rent",
    coordinates: { lat: 41.0082, lng: 28.9082 },
    address: "Bayrampaşa, İstanbul, Türkiye",
    ownerMail: "Baran",
    description: loremIpsum,
    keyFeatures: {
      fiberInternet: false,
      airConditioner: false,
      floorHeating: false,
      fireplace: false,
      terrace: false,
      satellite: false,
      parquet: false,
      steelDoor: true,
      furnished: false,
      insulation: false,
    },
  },
  {
    id: 3,
    title: "ISPARTAKULE 3+1 DAİRELERİMİZDE FIRSATLAR DEVAM EDİYOR.",
    photo: [H13, House3, House2],
    price: "3.500.000",
    type: "Sale",
    coordinates: { lat: 41.0182, lng: 28.9684 },
    address: "Ispartakule, İstanbul, Türkiye",
    ownerMail: "Ali",
    description: loremIpsum,
    keyFeatures: {
      fiberInternet: true,
      airConditioner: false,
      floorHeating: false,
      fireplace: true,
      terrace: false,
      satellite: false,
      parquet: true,
      steelDoor: false,
      furnished: false,
      insulation: true,
    },
  },
  {
    id: 4,
    title: "Alibeyköy'de 3+1 2. Kat bu fırsatı kaçırmayın",
    photo: [H2, H9, H3],
    price: "2.500.000",
    type: "Sale",
    coordinates: { lat: 41.0082, lng: 28.9784 },
    address: "Alibeyköy, İstanbul, Türkiye",
    ownerMail: "Ali",
    description: loremIpsum,
    keyFeatures: {
      fiberInternet: false,
      airConditioner: true,
      floorHeating: false,
      fireplace: false,
      terrace: true,
      satellite: false,
      parquet: false,
      steelDoor: false,
      furnished: true,
      insulation: false,
    },
  },
  {
    id: 5,
    title: "EV5",
    photo: [House2, House3, H8],
    price: "230.006",
    type: "Rent",
    coordinates: { lat: 40.3833, lng: 28.9784 },
    address: "Topkapı, İstanbul, Türkiye",
    ownerMail: "Baran",
    description: loremIpsum,
    keyFeatures: {
      fiberInternet: true,
      airConditioner: false,
      floorHeating: false,
      fireplace: false,
      terrace: false,
      satellite: true,
      parquet: true,
      steelDoor: true,
      furnished: false,
      insulation: true,
    },
  },
  {
    id: 6,
    title: "EV6",
    photo: [H8, House3, House2],
    price: "230.007",
    type: "Sale",
    coordinates: { lat: 41.0033, lng: 28.9082 },
    address: "Zeytinburnu, İstanbul, Türkiye",
    ownerMail: "Ali",
    description: loremIpsum,
    keyFeatures: {
      fiberInternet: false,
      airConditioner: true,
      floorHeating: true,
      fireplace: true,
      terrace: true,
      satellite: false,
      parquet: false,
      steelDoor: false,
      furnished: true,
      insulation: false,
    },
  },
  {
    id: 7,
    title: "EV7",
    photo: [House2, House3, H4],
    price: "230.008",
    type: "Sale",
    coordinates: { lat: 41.0133, lng: 28.9684 },
    address: "Eminönü, İstanbul, Türkiye",
    ownerMail: "Ali",
    description: loremIpsum,
    keyFeatures: {
      fiberInternet: true,
      airConditioner: true,
      floorHeating: false,
      fireplace: true,
      terrace: true,
      satellite: true,
      parquet: false,
      steelDoor: false,
      furnished: false,
      insulation: true,
    },
  },
  {
    id: 8,
    title: "EV8",
    photo: [H3, House2, H2],
    price: "230.009",
    type: "Rent",
    coordinates: { lat: 41.0033, lng: 28.9784 },
    address: "Şişli, İstanbul, Türkiye",
    ownerMail: "Baran",
    description: loremIpsum,
    keyFeatures: {
      fiberInternet: false,
      airConditioner: false,
      floorHeating: true,
      fireplace: false,
      terrace: false,
      satellite: true,
      parquet: true,
      steelDoor: false,
      furnished: true,
      insulation: false,
    },
  },
  {
    id: 9,
    title: "EV9",
    photo: [House3, House3, H7],
    price: "230.010",
    type: "Sale",
    coordinates: { lat: 40.3332, lng: 28.9784 },
    address: "Beylikdüzü, İstanbul, Türkiye",
    ownerMail: "Ali",
    description: loremIpsum,
    keyFeatures: {
      fiberInternet: true,
      airConditioner: true,
      floorHeating: false,
      fireplace: false,
      terrace: true,
      satellite: true,
      parquet: false,
      steelDoor: false,
      furnished: false,
      insulation: false,
    },
  },
  {
    id: 10,
    title: "EV10",
    photo: [House2, House2, H4],
    price: "230.011",
    type: "Rent",
    coordinates: { lat: 41.3382, lng: 28.9082 },
    address: "Bakırköy, İstanbul, Türkiye",
    ownerMail: "Baran",
    description: loremIpsum,
    keyFeatures: {
      fiberInternet: false,
      airConditioner: false,
      floorHeating: false,
      fireplace: false,
      terrace: true,
      satellite: false,
      parquet: false,
      steelDoor: true,
      furnished: false,
      insulation: false,
    },
  },
];

export default homes;

// Interim gallery, pulled from the old site. Replace with the client's new
// photos (put them in /public/images and use paths like "/images/press-01.jpg").

const wp = (path: string) => `https://canaraflex.com/wp-content/uploads/${path}`;

export const galleryImages: { src: string; alt: string }[] = [
  // TODO: write a real caption for each photo once the client confirms what it shows.
  { src: wp("2022/07/RG-3000-shaft-less-scaled.jpg"), alt: "RG 3000 shaftless rotogravure press" },
  { src: wp("2025/05/RG-250-scaled.webp"), alt: "Rotogravure press" },
  { src: wp("2022/07/Factory-Photo-1-scaled.jpg"), alt: "Canara Flex factory, Bengaluru" },
  { src: wp("2022/07/canara-1-scaled.jpg"), alt: "Canara Flex team" },
  { src: wp("2022/08/e2.jpg"), alt: "Machine in the assembly bay" },
  { src: wp("2022/08/e3.jpg"), alt: "Machine in the assembly bay" },
  { src: wp("2022/08/e4.jpg"), alt: "Machine in the assembly bay" },
  { src: wp("2022/06/GF.jpg"), alt: "Shop floor" },
  { src: wp("2022/06/R1.jpg"), alt: "Machine detail" },
  { src: wp("2022/06/SD.jpg"), alt: "Machine detail" },
  { src: wp("2022/06/CVV.jpg"), alt: "Machine detail" },
  { src: wp("2022/06/CFD-scaled.jpg"), alt: "Machine detail" },
];

export const galleryVideos: { src: string; title: string }[] = [
  // TODO: replace with edited clips; these are raw WhatsApp exports from the old site.
  { src: wp("2025/05/WhatsApp-Video-2025-05-09-at-11.13.36-AM.mp4"), title: "Machine running at the factory" },
  { src: wp("2025/05/WhatsApp-Video-2025-05-09-at-11.13.37-AM.mp4"), title: "Machine running at the factory" },
];

export const factoryPhoto = { src: wp("2022/07/Factory-Photo-1-scaled.jpg"), alt: "Canara Flex factory in Bengaluru" };
export const heroPhoto = { src: wp("2025/05/RG-250-scaled.webp"), alt: "Canara Flex rotogravure printing press" };

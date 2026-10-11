// Company-wide facts. Everything here was taken from the current site;
// lines marked TODO need confirming with the client.

export const company = {
  name: "Canara Flex",
  founded: 2000,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://canaraflex.com",
  tagline: "Printing, lamination and slitting machines for flexible packaging",
  phones: ["+91 98454 96376", "+91 93412 73422"],
  email: "sanjeevflex@gmail.com",
  // TODO: get the full postal address. Only the map pin exists on the old site.
  address: {
    line1: "",
    city: "Bengaluru",
    region: "Karnataka",
    country: "India",
  },
  map: {
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15561.750419657219!2d77.6805336!3d12.8149745!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x537b7d527ab08efa!2sCanara%20flex!5e0!3m2!1sen!2sin!4v1655967039007!5m2!1sen!2sin",
  },
  serviceCities: ["Bengaluru", "Chennai", "Coimbatore", "Mumbai", "Delhi"],
  // TODO: add real profile URLs, or leave empty to hide the links.
  social: [] as { label: string; href: string }[],
};

export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;

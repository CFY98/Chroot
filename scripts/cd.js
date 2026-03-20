// IMPORTS
import { addLine, blank } from "./utilities.js";

export function beans(block) {
  addLine(block, "Beans:", "info");
  blank(block);
  addLine(
    block,
    "Our selection of single origin specialty coffee beans.",
    "info",
  );
  blank(block);
  addLine(block, "  Blaze        £11.99", "info");
  addLine(block, "  Sunshine     £13.99", "info");
  addLine(block, "  Summit       £19.99", "info");
  blank(block);
}

export function equipment(block) {
  addLine(block, "Equipment:", "info");
  blank(block);
  addLine(block, "Everything you need to brew the perfect cup.", "info");
  blank(block);
  addLine(block, "  Filters      paper filters for pour over brewing", "info");
  addLine(block, "  Dripper      ceramic pour over dripper", "info");
  addLine(block, "  Grinder      hand burr grinder", "info");
  blank(block);
}

export function blaze(block) {
  addLine(block, "Blaze:", "info");
  blank(block);
  addLine(block, "  Origin:      Huila, Colombia", "info");
  addLine(block, "  Varietal:    Pink Bourbon", "info");
  addLine(block, "  Altitude:    1,600 — 1,900m", "info");
  addLine(block, "  Process:     Washed", "info");
  addLine(block, "  Roast:       Light", "info");
  addLine(block, "  Harvest:     March — June", "info");
  addLine(block, "  Notes:       Bright, citrus, stone fruit", "info");
  addLine(block, "  Quantity:    200g", "info");
  blank(block);
  addLine(block, "  Price:       £13.99", "info");
  blank(block);
}

export function sunshine(block) {
  addLine(block, "Sunshine", "info");
  blank(block);
  addLine(block, "  Origin:      Yirgacheffe, Ethiopia", "info");
  addLine(block, "  Varietal:    Heirloom", "info");
  addLine(block, "  Altitude:    1,800 — 2,200m", "info");
  addLine(block, "  Process:     Natural", "info");
  addLine(block, "  Roast:       Light", "info");
  addLine(block, "  Harvest:     November — January", "info");
  addLine(block, "  Notes:       Blueberry, Assam tea, Molasses", "info");
  blank(block);
  addLine(block, "  Quantity:    200g", "info");
  addLine(block, "  Price:       £15.99", "info");
  blank(block);
}

export function summit(block) {
  addLine(block, "Summit", "info");
  blank(block);
  addLine(block, "  Origin:      Antigua, Guatemala", "info");
  addLine(block, "  Varietal:    Gesha", "info");
  addLine(block, "  Altitude:    1,500 — 1,700m", "info");
  addLine(block, "  Process:     Honey", "info");
  addLine(block, "  Roast:       Light", "info");
  addLine(block, "  Harvest:     December — March", "info");
  addLine(block, "  Notes:       Jasmine, Bergamot, White Peach", "info");
  blank(block);
  addLine(block, "  Quantity:    150g", "info");
  addLine(block, "  Price:       £19.99", "info");
  blank(block);
}

export function filters(block) {
  addLine(block, "Chroot Filters", "info");
  blank(block);
  addLine(block, "  Our in-house filters are designed", "info");
  addLine(block, "  to fit household favourites such as", "info");
  addLine(block, "  the Hario V60, the Cafec Flower and", "info");
  addLine(block, "  our very own Chroot Dripper.", "info");
  blank(block);
  addLine(block, "  Quantity:    100 per pack", "info");
  addLine(block, "  Price:       £9.99", "info");
  blank(block);
}

export function dripper(block) {
  addLine(block, "Chroot Dripper", "info");
  blank(block);
  addLine(block, "  After years of teseting, we have", "info");
  addLine(block, "  unveiled the Chroot Dripper!", "info");
  blank(block);
  addLine(block, "  With BPA-Free Tritan Plastic chosen", "info");
  addLine(block, "  for its high durability and heat resistance,", "info");
  addLine(block, "  the Chroot Dripper is perfect for when", "info");
  addLine(block, "  you're on the go or at home.", "info");
  blank(block);
  addLine(block, "  Material:    BPA-Free Tritan Plastic", "info");
  addLine(block, "  Size:        1-4 cups", "info");
  addLine(block, "  Price:       £14.99", "info");
  blank(block);
}

export function grinder(block) {
  addLine(block, "Chroot Grinder", "info");
  blank(block);
  addLine(block, "  Embrace the morning with the Chroot Grinder.", "info");
  addLine(block, "  Whether you're a fan of the French Press or", "info");
  addLine(block, "  need to dial-in for those espresso shots,", "info");
  addLine(block, "  the precision-made 48m conical burrs are,", "info");
  addLine(block, "  designed for all needs from the enthusiast,", "info");
  addLine(block, "  to the professional.", "info");
  blank(block);
  addLine(block, "  Whether on the go or at home, the compact", "info");
  addLine(block, "  size and weight of 600g allows for a sturdy", "info");
  addLine(block, "  yet lightweight feel to provide a premium", "info");
  addLine(block, "  experience for the most adventurous of", "info");
  addLine(block, "  drinkers.", "info");
  blank(block);
  addLine(block, "Burrs:        48m Stainless steel conical burrs", "info");
  addLine(block, "Weight:       600g", "info");
  blank(block);
  addLine(block, "Price:        £129.99", "info");
  blank(block);
}

export const cdPages = {
  beans: beans,
  equipment: equipment,
  blaze: blaze,
  sunshine: sunshine,
  filers: filters,
  dripper: dripper,
  grinder: grinder,
};

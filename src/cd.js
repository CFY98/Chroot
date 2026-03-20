// IMPORTS
import { addLine, blank } from "./utilities.js";
import { router } from "./routerSPA.js";

// cdPages
export function gui() {
  setTimeout(() => {
    history.pushState({}, "", "/");
    router("/");
  }, 100);
}
export function beans(block) {
  blank(block);
  addLine(block, "  Blaze        £11.99", "info");
  addLine(block, "  Sunshine     £14.99", "info");
  addLine(block, "  Summit       £19.99", "info");
  blank(block);
}
export function equipment(block) {
  blank(block);
  addLine(block, "  Filters      £9.99", "info");
  addLine(block, "  Dripper      £14.99", "info");
  addLine(block, "  Grinder      £129.99", "info");
  blank(block);
}
export function blaze(block) {
  blank(block);
  addLine(block, "  Origin:      Huila, Colombia", "info");
  addLine(block, "  Varietal:    Pink Bourbon", "info");
  addLine(block, "  Altitude:    1,600 — 1,900m", "info");
  addLine(block, "  Process:     Washed", "info");
  addLine(block, "  Roast:       Light", "info");
  addLine(block, "  Harvest:     March — June", "info");
  addLine(block, "  Notes:       Melon, Lemonade, Peach", "info");
  blank(block);
  addLine(block, "  Quantity:    200g", "info");
  addLine(block, "  Price:       £11.99", "info");
  blank(block);
}
export function sunshine(block) {
  blank(block);
  addLine(block, "  Origin:      Yirgacheffe, Ethiopia", "info");
  addLine(block, "  Varietal:    Heirloom", "info");
  addLine(block, "  Altitude:    1,800 — 2,200m", "info");
  addLine(block, "  Process:     Natural", "info");
  addLine(block, "  Roast:       Light", "info");
  addLine(block, "  Harvest:     November — January", "info");
  addLine(block, "  Notes:       Blueberry, Toffee, Cherry", "info");
  blank(block);
  addLine(block, "  Quantity:    200g", "info");
  addLine(block, "  Price:       £14.99", "info");
  blank(block);
}
export function summit(block) {
  blank(block);
  addLine(block, "  Origin:      Antigua, Guatemala", "info");
  addLine(block, "  Varietal:    Gesha", "info");
  addLine(block, "  Altitude:    1,500 — 1,700m", "info");
  addLine(block, "  Process:     Honey", "info");
  addLine(block, "  Roast:       Light", "info");
  addLine(block, "  Harvest:     December — March", "info");
  addLine(block, "  Notes:       Jasmine, Bergamot, Pear", "info");
  blank(block);
  addLine(block, "  Quantity:    150g", "info");
  addLine(block, "  Price:       £19.99", "info");
  blank(block);
}
export function filters(block) {
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
  blank(block);
  addLine(block, "  After years of teseting, we have", "info");
  addLine(block, "  unveiled the Chroot Dripper!", "info");
  blank(block);
  addLine(block, "  With BPA-Free Tritan Plastic chosen", "info");
  addLine(block, "  for its high durability and heat", "info");
  addLine(block, "  resistance, the Chroot Dripper is", "info");
  addLine(block, "  perfect for when you're on the go", "info");
  addLine(block, "  or at home.", "info");
  blank(block);
  addLine(block, "  Material:    BPA-Free Tritan Plastic", "info");
  addLine(block, "  Size:        1-4 cups", "info");
  addLine(block, "  Price:       £14.99", "info");
  blank(block);
}
export function grinder(block) {
  blank(block);
  addLine(block, "  Embrace the morning with the", "info");
  addLine(block, "  Chroot Grinder.", "info");
  blank(block);
  addLine(block, "  Whether you're a fan of the French", "info");
  addLine(block, "  Press or need to dial-in for those", "info");
  addLine(block, "  espresso shots, the precision-made", "info");
  addLine(block, "  48m conical burrs are designed for", "info");
  addLine(block, "  all needs from the enthusiast to the", "info");
  addLine(block, "  professional", "info");
  blank(block);
  addLine(block, "  Whether on the go or at home, the", "info");
  addLine(block, "  compact size and weight of 600g allows", "info");
  addLine(block, "  for a sturdy yet lightweight feel to", "info");
  addLine(block, "  provide a premium experience for the", "info");
  addLine(block, "  most adventurous of drinkers.", "info");
  blank(block);
  addLine(block, "  Burr Set:     48m Conical SS", "info");
  addLine(block, "  Material:     7075 Aluminium", "info");
  addLine(block, "  Weight:       600g", "info");
  addLine(block, "  Price:        £129.99", "info");
  blank(block);
}
export const cdPages = {
  gui: gui,
  beans: beans,
  equipment: equipment,
  blaze: blaze,
  sunshine: sunshine,
  summit: summit,
  filters: filters,
  dripper: dripper,
  grinder: grinder,
};

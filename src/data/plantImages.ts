// Plant Image Imports
import ricePaddy from "@/assets/plants/rice-paddy.jpg";
import wheat from "@/assets/plants/wheat.jpg";
import cotton from "@/assets/plants/cotton.jpg";
import sugarcane from "@/assets/plants/sugarcane.jpg";
import maize from "@/assets/plants/maize.jpg";
import tomato from "@/assets/plants/tomato.jpg";
import onion from "@/assets/plants/onion.jpg";
import potato from "@/assets/plants/potato.jpg";
import brinjal from "@/assets/plants/brinjal.jpg";
import okra from "@/assets/plants/okra.jpg";
import cauliflower from "@/assets/plants/cauliflower.jpg";
import cabbage from "@/assets/plants/cabbage.jpg";
import greenChili from "@/assets/plants/green-chili.jpg";
import bottleGourd from "@/assets/plants/bottle-gourd.jpg";
import bitterGourd from "@/assets/plants/bitter-gourd.jpg";
import mango from "@/assets/plants/mango.jpg";
import banana from "@/assets/plants/banana.jpg";
import papaya from "@/assets/plants/papaya.jpg";
import pomegranate from "@/assets/plants/pomegranate.jpg";
import guava from "@/assets/plants/guava.jpg";
import turmeric from "@/assets/plants/turmeric.jpg";
import ginger from "@/assets/plants/ginger.jpg";
import coriander from "@/assets/plants/coriander.jpg";
import mint from "@/assets/plants/mint.jpg";
import curryLeaves from "@/assets/plants/curry-leaves.jpg";
import neem from "@/assets/plants/neem.jpg";
import tulsi from "@/assets/plants/tulsi.jpg";
import aloeVera from "@/assets/plants/aloe-vera.jpg";
import marigold from "@/assets/plants/marigold.jpg";
import jasmine from "@/assets/plants/jasmine.jpg";

// Map plant IDs to their images (matching indianPlants.ts IDs)
export const plantImages: Record<number, string> = {
  // Crops (IDs 1-5)
  1: ricePaddy,
  2: wheat,
  3: cotton,
  4: sugarcane,
  5: maize,
  // Vegetables (IDs 6-10)
  6: tomato,
  7: onion,
  8: potato,
  9: brinjal,
  10: okra,
  // Fruits (IDs 11-15)
  11: mango,
  12: banana,
  13: guava,
  14: papaya,
  15: pomegranate, // Using pomegranate for coconut slot as we don't have coconut image
  // Spices & Herbs (IDs 16-20)
  16: turmeric,
  17: ginger,
  18: coriander,
  19: mint,
  20: curryLeaves,
  // Medicinal (IDs 21-23)
  21: neem,
  22: tulsi,
  23: aloeVera,
  // Flowers (IDs 24-25)
  24: marigold,
  25: jasmine,
  // Additional Vegetables (IDs 26-30)
  26: cauliflower,
  27: cabbage,
  28: greenChili,
  29: bottleGourd,
  30: bitterGourd,
};

export const getPlantImage = (plantId: number): string | undefined => {
  return plantImages[plantId];
};

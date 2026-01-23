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

// Map plant IDs to their images
export const plantImages: Record<number, string> = {
  1: ricePaddy,
  2: wheat,
  3: cotton,
  4: sugarcane,
  5: maize,
  6: tomato,
  7: onion,
  8: potato,
  9: brinjal,
  10: okra,
  11: cauliflower,
  12: cabbage,
  13: greenChili,
  14: bottleGourd,
  15: bitterGourd,
  16: mango,
  17: banana,
  18: papaya,
  19: pomegranate,
  20: guava,
  21: turmeric,
  22: ginger,
  23: coriander,
  24: mint,
  25: curryLeaves,
  26: neem,
  27: tulsi,
  28: aloeVera,
  29: marigold,
  30: jasmine,
};

export const getPlantImage = (plantId: number): string | undefined => {
  return plantImages[plantId];
};

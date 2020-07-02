import csv from "csv-load-sync"
import { shallowMount } from "@vue/test-utils"
import Sofa from "../src/components/Sofa.vue"

describe("Sofa", () => {
  const sofa = shallowMount(Sofa)
  const testCases = csv("tests/sofa.csv")

  test.each(testCases)("Test Case %#", (data) => {
    sofa.setData({
      respPaO2: data.respPaO2,
      respFiO2: data.respFiO2,
      coagulation: data.coagulation,
      liver: data.liver,
      cardiovascular: data.cardiovascular,
      cardioMap: data.cardioMap,
      cardioDop: data.cardioDop,
      cardioEpi: data.cardioEpi,
      cardioDob: data.cardioDob,
      nervous: data.nervous,
      renalCreat: data.renalCreat,
      renalUrine: data.renalUrinel,
    })
    expect(sofa.vm.respFrac).toBe(+data.respFrac)
    expect(sofa.vm.respiration).toBe(+data.respiration)
  })
})

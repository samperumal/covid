import { shallowMount } from "@vue/test-utils"
import PrioritySummary from "../src/components/PrioritySummary.vue"

function getMountedComponent(Component, propsData) {
  return shallowMount(Component, {
    propsData,
  })
}

describe("PrioritySummary", () => {
  const component = getMountedComponent(PrioritySummary, {
    scores: {
      sofa: 1,
      morbidity: 1,
      age: 1,
      functionality: 1
    }
  })
  it('computes the score correctly', () => {
    expect(
      component.vm.priorityScore.score
    ).toEqual(4)
  })
  it('computes the bucket correctly', () => {
    expect(
      component.vm.priorityScore.bucket
    ).toEqual("orange")
  })
  it('computes the ventilator response correctly', () => {
    expect(
      component.vm.priorityScore.ventilator
    ).toEqual("Intermediate priority for ventilator support.")
  })
  it('computes the prioritisation correctly', () => {
    expect(
      component.vm.priorityScore.prioritisation
    ).toEqual("Receive resources if available after all patients in red group allocated.")
  })
  it('displays the score correctly', () => {
    expect(
      component.find("div.priority-score").text()
    ).toEqual("Priority Score: 4")
  })
  it('displays the bucket correctly', () => {
    expect(
      component.find("div.bucket").text()
    ).toEqual("orange")
  })
  it('displays the ventilator response correctly', () => {
    expect(
      component.find("div.ventilator").text()
    ).toEqual("Intermediate priority for ventilator support.")
  })
  it('displays the prioritisation correctly', () => {
    expect(
      component.find("div.prioritisation").text()
    ).toEqual("Receive resources if available after all patients in red group allocated.")
  })
})

import frail1 from "./img/frail1.png"
import frail2 from "./img/frail2.png"
import frail3 from "./img/frail3.png"
import frail4 from "./img/frail4.png"
import frail5 from "./img/frail5.png"
import frail6 from "./img/frail6.png"
import frail7 from "./img/frail7.png"
import frail8 from "./img/frail8.png"
import frail9 from "./img/frail9.png"

export function frailtyScaleData() {
  return [
    {
      score: "1",
      group: "Very Fit",
      description:
        "People who are robust, active, energetic and motivated. These people commonly exercise regularly. They are among the fittest for their age.",
      value: "0a",
      image: frail1,
    },
    {
      score: "2",
      group: "Well",
      description:
        "People who have <strong>no active disease symptoms</strong> but are less fit than category 1. Often, they exercise or are very <strong>active occasionally</strong>, e.g. seasonally.",
      value: "0b",
      image: frail2,
    },
    {
      score: "3",
      group: "Managing Well",
      description:
        "People whose <strong>medical problems are well controlled</strong>, but are not regularly active beyond routine walking.",
      value: "0c",
      image: frail3,
    },
    {
      score: "4",
      group: "Vulnerable",
      description:
        "While not dependent on others for daily help, often <strong>symptoms limit activities</strong>. A common complaint is being 'slowed up', and/or being tired during the day.",
      value: "3",
      image: frail4,
    },
    {
      score: "5",
      group: "Mildly Frail",
      description:
        "These people often have <strong>more evident slowing</strong>, and need help in <strong>high order IADLs</strong> (finances, transportation, heavy housework, medications). Typically, mild frailty progressively impairs shopping and walking outside alone, meal preparation, and housework.",
      value: "4",
      image: frail5,
    },
    {
      score: "6",
      group: "Moderately Frail",
      description:
        "People who need help with <strong>all outside activities</strong> and with <strong>keeping house</strong>. Inside, they often have problems with stairs and need <strong>help with bathing</strong> and might need minimal assistance (cuing, standby) with dressing.",
      value: "6",
      image: frail6,
    },
    {
      score: "7",
      group: "Severely Frail",
      description:
        "<strong>Completely dependent for personal care</strong>, from whatever cause (physical or cognitive). Even so, they seem stable and not at high risk of dying (within ~ 6 months).",
      value: "7",
      image: frail7,
    },
    {
      score: "8",
      group: "Very Severely Frail",
      description:
        "Completely dependent, approaching the end of life. Typically, they could not recover even from a minor illness.",
      value: "8",
      image: frail8,
    },
    {
      score: "9",
      group: "Terminally Ill",
      description:
        "Approaching the end of life. This category applies to people with a <strong>life expectancy < 6 months</strong>, who are <strong>not otherwise evidently frail</strong>.",
      value: "9",
      image: frail9,
    },
  ]
}

export function ecogScaleData() {
  return [
    {
      score: "0",
      group: "Fully active",
      description:
        "Fully active, able to carry on all pre-disease performance without restriction.",
      value: "0",
    },
    {
      score: "1",
      group: "Restricted in activity",
      description:
        "Restricted in physically strenuous activity but ambulatory and able to carry out work of a light or sedentary nature, e.g., light house work, office work.",
      value: "1",
    },
    {
      score: "2",
      group: "Ambulatory and capable",
      description:
        "Ambulatory and capable of all selfcare but unable to carry out any work activities; up and about more than 50% of waking hours.",
      value: "2",
    },
    {
      score: "3",
      group: "Limited selfcare",
      description:
        "Capable of only limited selfcare; confined to bed or chair more than 50% of waking hours.",
      value: "3",
    },
    {
      score: "4",
      group: "Completely disabled",
      description:
        "Completely disabled; cannot carry on any selfcare; totally confined to bed or chair.",
      value: "4",
    },
  ]
}

export function mmrcScaleData() {
  return [
    {
      score: "0",
      group: "mMRC 0",
      description: "I only get breathless with strenuous exercise.",
      value: "0",
    },
    {
      score: "1",
      group: "mMRC 1",
      description:
        "I get short of breath when hurrying on level ground or walking up a slight hill.",
      value: "1",
    },
    {
      score: "2",
      group: "mMRC 2",
      description:
        "On level ground, I walk slower than people of the same age because of breathlessness, or have to stop for breath when walking at my own pace.",
      value: "2",
    },
    {
      score: "3",
      group: "mMRC 3",
      description:
        "I stop for breath after walking about 100 yards (90 m) or after a few minutes on level ground.",
      value: "3",
    },
    {
      score: "4",
      group: "mMRC 4",
      description:
        "I am too breathless to leave the house or I am breathless when dressing.",
      value: "5",
    },
  ]
}

export function nyhaScaleData() {
  return [
    {
      score: "1",
      group: "NYHA 1",
      description:
        "No limitation of physical activity. Ordinary physical activity does not cause undue fatigue, palpitation, dyspnea (shortness of breath).",
      value: "1",
    },
    {
      score: "2",
      group: "NYHA 2",
      description:
        "Slight limitation of physical activity. Comfortable at rest. Ordinary physical activity results in fatigue, palpitation, dyspnea (shortness of breath).",
      value: "2",
    },
    {
      score: "3",
      group: "NYHA 3",
      description:
        "Marked limitation of physical activity. Comfortable at rest. Less than ordinary activity causes fatigue, palpitation, or dyspnea.",
      value: "3",
    },
    {
      score: "4",
      group: "NYHA 4",
      description:
        "Unable to carry on any physical activity without discomfort. Symptoms of heart failure at rest. If any physical activity is undertaken, discomfort increases.",
      value: "5",
    },
  ]
}

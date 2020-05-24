<template>
  <section>
    <div class="title has-text-centered">Frailty Assessment</div>
    <div class="subtitle has-text-centered">Evaluate function 1-2 weeks prior to presentation</div>
		<div v-for="category in frailtyScaleData()" :key="category.Score">
			<router-link :to="category.Next">
			<div class="card">
				<div class="card-content">
					<div class="media">
						<div class="media-left">
							<figure class="image is-60x60" style="width: 70px;">
								<img :src="category.Image" alt="Placeholder image" class="group-image">
							</figure>
						</div>
						<div class="media-content">
							<p class="title is-4">{{ category.Group }}</p>
							<p class="subtitle is-6">Score: {{ category.Score }}</p>
						</div>
					</div>

					<div class="content" v-html="category.Description">
					</div>
				</div>
			</div>
			</router-link>
		</div>
  </section>
</template>

<script>
export default {
	methods: {
		frailtyScaleData() {
			return [
				{
					"Score": "1",
					"Group": "Very Fit",
					"Description": "People who are robust, active, energetic and motivated. These people commonly exercise regularly. They are among the fittest for their age.",
					"Next": "/frailty/sofa",
					"Image": require("../img/frail1.png")
				},
				{
					"Score": "2",
					"Group": "Well",
					"Description": "People who have <strong>no active disease symptoms</strong> but are less fit than category 1. Often, they exercise or are very <strong>active occasionally</strong>, e.g. seasonally.",
					"Next": "/frailty/sofa",
					"Image": require("../img/frail2.png")
				},
				{
					"Score": "3",
					"Group": "Managing Well",
					"Description": "People whose <strong>medical problems are well controlled</strong>, but are not regularly active beyond routine walking.",
					"Next": "/frailty/sofa",
					"Image": require("../img/frail3.png")
				},
				{
					"Score": "4",
					"Group": "Vulnerable",
					"Description": "While not dependent on others for daily help, often <strong>symptoms limit activities</strong>. A common complaint is being 'slowed up', and/or being tired during the day.",
					"Next": "/frailty/sofa",
					"Image": require("../img/frail4.png")
				},
				{
					"Score": "5",
					"Group": "Mildly Frail",
					"Description": "These people often have <strong>more evident slowing</strong>, and need help in <strong>high order IADLs</strong> (finances, transportation, heavy housework, medications). Typically, mild frailty progressively impairs shopping and walking outside alone, meal preparation, and housework.",
					"Next": "management-plan",
					"Image": require("../img/frail5.png")
				},
				{
					"Score": "6",
					"Group": "Moderately Frail",
					"Description": "People who need help with <strong>all outside activities</strong> and with <strong>keeping house</strong>. Inside, they often have problems with stairs and need <strong>help with bathing</strong> and might need minimal assistance (cuing, standby) with dressing.",
					"Next": "management-plan",
					"Image": require("../img/frail6.png")
				},
				{
					"Score": "7",
					"Group": "Severely Frail",
					"Description": "<strong>Completely dependent for personal care</strong>, from whatever cause (physical or cognitive). Even so, they seem stable and not at high risk of dying (within ~ 6 months).",
					"Next": "management-plan",
					"Image": require("../img/frail7.png")
				},
				{
					"Score": "8",
					"Group": "Very Severely Frail",
					"Description": "Completely dependent, approaching the end of life. Typically, they could not recover even from a minor illness.",
					"Next": "management-plan",
					"Image": require("../img/frail8.png")
				},
				{
					"Score": "9",
					"Group": "Terminally Ill",
					"Description": "Approaching the end of life. This category applies to people with a <strong>life expectancy < 6 months</strong>, who are <strong>not otherwise evidently frail</strong>.",
					"Next": "management-plan",
					"Image": require("../img/frail9.png")
				}
			]
		}
	}
}
</script>

<style>
.card {
	margin-bottom: 1em;
}

.card .media-content {
	overflow-x: inherit;
}

.card .group-image {
	max-height: 60px; 
	max-width: 60px; 
	height: auto; 
	width: auto;
}
</style>
<template>
	<section>
		<div class="container has-text-centered">
			<div class="title">CCSSA Triage Guidelines</div>
			<div class="subtitle">as at 2 April 2020</div>
			<div class="box is-6">
				<div class="notice">
					<div>
						<p><strong>This tool has NOT been validated or approved by the <a href="https://www.samedical.org/">South African Medical Association (SAMA)</a> or the <a href="https://criticalcare.org.za/">Critical Care Society of
Southern Africa (CCSSA)</a>.</strong></p>
						<p>It is intended solely for the use of qualified doctors who are already familiar with the guidelines, and who need an electronic aid to speed up the calculation of Priority Scores for triage management.</p>
						<p>This application provides an interactive version of the triage flowchart presented in [1]. Images from [2] are used along with the corresponding Frailty assessment scale.</p>
					</div>
				</div>
			</div>
			<router-link to="frailty"><div class="button is-info is-large">Begin Frailty Assessment</div></router-link>
		</div>
	</section>
</template>

<script>
import axios from 'axios'

export default {
	data() {
		return {
			fsm: this.resetData()
		}
	},
	methods: {
		resetData() {
			return {
				
			}
		}
	},
	mounted() {		
		this.fsm = this.resetData()
		axios.get("https://tmscorebot.azurewebsites.net/api/log")
			.then(() => console.log("Home visit logged"))
			.catch(() => console.log("Unable to contact server"))
	}
}
</script>

<style>
.notice p {
	margin-bottom: 1em;
	line-height: 1.15rem;
}

.notice {
	display: flex;
	text-align: justify;
}
</style>
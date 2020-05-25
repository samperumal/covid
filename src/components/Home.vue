<template>
	<section>
		<div class="container has-text-centered">
			<div class="title">CCSSA Triage Guidelines</div>
			<div class="subtitle">as at 2 April 2020</div>
			<div class="box is-6">
				<div class="notice">
					<div>
						<p><strong>This tool has not been validated or approved by the CCSSA.</strong></p>
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

.notice > div {
	/* max-width: 350px; */
}
</style>
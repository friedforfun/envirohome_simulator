node {
	def commit_id
	stage('Preparation'){
		checkout scm
		sh "git rev-parse --short HEAD > .git/commit-id"
		commit_id = readfile('.git/commit-id').trim()
	}
	stage('build'){
		sh 'docker-compose -f docker-compose.yml build'
		sh 'docker-compose -f docker-compose.yml up --abort-on-container-exit'
	}
}
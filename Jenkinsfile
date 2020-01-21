node{
    stage('Preparation'){
        git branch: 'dev',
        credentialsId: 'gitid',
        url:"https://github.com/friedforfun/envirohome_simulator.git"
        echo "scm checked out"

    }
    stage('Build'){
        sh "docker-compose build"
        sh "docker-compose up --force-recreate --abort-on-container-exit"
    }
    post {
      always {
         sh "docker-compose down || true"
         sh "rm -r /usr/src/app/."
      }
   }   
}
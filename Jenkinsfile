node{
    parameters {
        choice(
            choices: ['pass' , 'fail'],
            description: '',
            name: 'PASS_FAIL')
    }
    stage('Preparation'){
        git branch: 'dev',
        credentialsId: 'gitid',
        url:"https://github.com/friedforfun/envirohome_simulator.git"
        echo "scm checked out"

    }
    stage('Build'){
        sh "docker-compose build"
        sh "docker-compose up"
    }
    stage('Test'){
        echo "run tests here"
        when{
            expression{
                // pass in test pass/fail to test CI, parse xml ect in real file
                params.PASS_FAIL == 'pass'
            }
        }
        steps{
            echo "tests passed, git push to master here"
        }
    }
    post {
      always {
         sh "docker-compose down || true"
         sh "rm -r /usr/src/app/."
      }
   }   
}
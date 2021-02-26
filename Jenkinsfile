pipeline {
    stages {
        stage('Deploy') { 
            steps {
                sh 'rm -rf /node/*' 
                sh 'cp -a ./* /node' 
                sh 'docker restart you-node' 
            }
        }
    }
}

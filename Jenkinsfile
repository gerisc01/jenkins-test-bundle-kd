pipeline {
  agent any
  stages {
    stage('Prepare Environment') {
      steps {
        echo 'Installing/Updating Yarn and making sure bundle libraries are up to date'
      }
    }
    stage('Test') {
      steps {
        echo 'Test bundle'
      }
    }
    stage('Build') {
      steps {
        echo 'Build bundle'
      }
    }
    stage('Upload to S3') {
      steps {
        script {
          S3DIR = sh(returnStdout: true, script: 'echo `expr "$GIT_URL" : \'^.*/\\(.*\\)\\.git$\'`')
          echo "${S3DIR}"
        }
        
      }
    }
  }
}
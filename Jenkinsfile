pipeline {
  agent any
  stages {
    stage('Prepare Environment') {
      steps {
        sh 'curl -o- -L https://yarnpkg.com/install.sh | bash'
        sh 'yarn install'
      }
    }
    stage('Test') {
      steps {
        sh 'yarn test'
      }
    }
    stage('Build') {
      steps {
        sh 'yarn run build'
      }
    }
    stage('Post-Build') {
      steps {
        sh 'echo \'Upload to S3 here...\''
        mail(subject: 'Bundle Build Successful', body: 'Congrats, your recent bundle build was successful!')
      }
    }
  }
}
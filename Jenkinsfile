pipeline {
  agent any
  stages {
    stage('Prepare Environment') {
      steps {
        sh 'curl -o- -L https://yarnpkg.com/install.sh | bash'
        sh 'yarn install'
        sh 'curl -O https://bootstrap.pypa.io/get-pip.py'
        sh 'python get-pip.py --user'
        sh '/var/lib/jenkins/.local/bin/pip install awscli --upgrade --user'
        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'd9b3e21f-24a7-4d0b-8be8-e55eab29894f',
          usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {

          sh 'echo uname=$USERNAME pwd=$PASSWORD'
        }
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
        sh '/var/lib/jenkins/.local/bin/aws s3 sync dist s3://shayne-test1/jenkins-test-bundle-kd --acl public-read --metadata "cache-control=must-revalidate; max-age: 0"'
        mail(subject: 'Bundle Build Successful', body: 'Congrats, your recent bundle build was successful!', to: 'scott.gerike@kineticdata.com', from: 'scott.gerike@kineticdata.com')
      }
    }
  }
}

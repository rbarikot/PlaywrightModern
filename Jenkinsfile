pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'playwright-automation'
        TEAMS_WEBHOOK_URL = credentials('teams-webhook-url') // Store in Jenkins credentials
        COMPOSE_PROJECT_NAME = "playwright_${BUILD_NUMBER}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                checkout scm
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                script {
                    sh 'docker-compose build'
                }
            }
        }
        
        stage('Run Playwright Tests') {
            steps {
                echo 'Running Playwright tests...'
                script {
                    sh '''
                        docker-compose run --rm \
                        -e TEAMS_WEBHOOK_URL=${TEAMS_WEBHOOK_URL} \
                        playwright-tests
                    '''
                }
            }
        }
    }
    
    post {
        always {
            echo 'Publishing test results...'
            
            // Publish HTML Report
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'testResult/htmlreport',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report',
                reportTitles: 'Playwright Test Report'
            ])
            
            // Publish Smart Report
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'testResult/smartreport',
                reportFiles: 'smart-report.html',
                reportName: 'Smart Report',
                reportTitles: 'Playwright Smart Report'
            ])
            
            // Archive test results
            archiveArtifacts artifacts: 'testResult/**/*', allowEmptyArchive: true
            
            // Cleanup Docker resources
            script {
                sh '''
                    docker-compose down -v || true
                    docker system prune -f || true
                '''
            }
        }
        
        success {
            echo 'Tests passed successfully!'
            // Add notification here if needed
        }
        
        failure {
            echo 'Tests failed!'
            // Add notification here if needed
        }
    }
}
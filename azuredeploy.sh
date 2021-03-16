#! bin/bash
# Helper script to deploy the production optimised build of the react app to Azure

ResourceGroupName="chow-rg"
Location="WestUs2"   # Staric webapps are only available in  west us currently
SiteName="chowstaticwebapp"
AppName="Chow Meals" 
BuildLocation="build"  # "Directory where your production optimised build resides"
APIDir="api"
GitHubRepoUrl="https://github.com/peculiaxyz/chow"
GitHubRepoBranch="main"
GithubPAT=""


# First make sure we have a resource group
az group create -g $ResourceGroupName\
 -l $Location\
 --tags KeepRunning=False FullAppName="$AppName"  displayName="Chow Meals Resource Group" -o table



# Deploy static web app to Azure from Github
# NB: Not all regions are supported in current preview mode - 14 March 2021
az staticwebapp create \
    -n $SiteName \
    -g $ResourceGroupName \
    --location centralus \
    --source $GitHubRepoUrl \
    --branch master \
    --app-artifact-location $BuildLocation \
    --api-location $APIDir \
    --token $GITHUB_ACCESS_TOKEN \
    --tags KeepRunning=False FullAppName="$AppName" displayName="Chow Meals Static Web App" --verbose -o yamlc


az staticwebapp create -n "demo312"\
 -g $ResourceGroupName \
 -l $Location \
 -b $GitHubRepoBranch \
 -s "$GitHubRepoUrl" \
 --token "$GithubPAT" 


$ErrorActionPreference = "Stop"

Write-Host "Checking Kubernetes connection..."
kubectl cluster-info | Out-Null

Write-Host "Installing / updating NGINX Ingress Controller..."
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.15.1/deploy/static/provider/cloud/deploy.yaml

Write-Host "Waiting for NGINX Ingress Controller..."
kubectl wait --namespace ingress-nginx `
  --for=condition=ready pod `
  --selector=app.kubernetes.io/component=controller `
  --timeout=180s

Write-Host "Installing / updating Metrics Server..."
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

Write-Host "Patching Metrics Server for Docker Desktop..."
kubectl patch deployment metrics-server -n kube-system --type='json' -p='[
  {
    "op": "add",
    "path": "/spec/template/spec/containers/0/args/-",
    "value": "--kubelet-insecure-tls"
  }
]' 2>$null

Write-Host "Waiting for Metrics Server..."
kubectl rollout restart deployment/metrics-server -n kube-system | Out-Null
kubectl wait --namespace kube-system `
  --for=condition=ready pod `
  --selector=k8s-app=metrics-server `
  --timeout=180s

Write-Host "Building Docker images..."
docker build -t algorithmlab-backend:latest ./backend
docker build -t algorithmlab-frontend:latest ./frontend

Write-Host "Applying AlgorithmLab Kubernetes manifests..."
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/

Write-Host "Waiting for AlgorithmLab pods..."
Start-Sleep -Seconds 20
kubectl wait --for=condition=ready pod --all -n algorithmlab --timeout=180s

Write-Host "Kubernetes resources:"
kubectl get pods -n algorithmlab
kubectl get services -n algorithmlab
kubectl get pvc -n algorithmlab
kubectl get ingress -n algorithmlab
kubectl get hpa -n algorithmlab

Write-Host ""
Write-Host "Application available at:"
Write-Host "http://algorithmlab.local"
Write-Host ""
Write-Host "If the domain does not work, make sure this entry exists in your Windows hosts file:"
Write-Host "127.0.0.1 algorithmlab.local"
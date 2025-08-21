# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY LHFD.CatalogoDeProdutos.Api/*.csproj LHFD.CatalogoDeProdutos.Api/
COPY LHFD.CatalogoDeProdutos.Data/*.csproj LHFD.CatalogoDeProdutos.Data/
COPY LHFD.CatalogoDeProdutos.Business/*.csproj LHFD.CatalogoDeProdutos.Business/

RUN dotnet restore LHFD.CatalogoDeProdutos.Api/LHFD.CatalogoDeProdutos.Api.csproj

COPY . .
WORKDIR /src/LHFD.CatalogoDeProdutos.Api
RUN dotnet build LHFD.CatalogoDeProdutos.Api.csproj -c Release -o /app/build

# Publish stage
FROM build AS publish
RUN dotnet publish LHFD.CatalogoDeProdutos.Api.csproj -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=publish /app/publish .
ENV ASPNETCORE_URLS=http://+:5000
EXPOSE 5000
ENTRYPOINT ["dotnet", "LHFD.CatalogoDeProdutos.Api.dll"]

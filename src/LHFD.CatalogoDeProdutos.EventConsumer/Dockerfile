# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

COPY LHFD.CatalogoDeProdutos.EventConsumer/*.csproj LHFD.CatalogoDeProdutos.EventConsumer/
COPY LHFD.CatalogoDeProdutos.Business/*.csproj LHFD.CatalogoDeProdutos.Business/
COPY LHFD.CatalogoDeProdutos.Data/*.csproj LHFD.CatalogoDeProdutos.Data/

RUN dotnet restore LHFD.CatalogoDeProdutos.EventConsumer/LHFD.CatalogoDeProdutos.EventConsumer.csproj

COPY . .
WORKDIR /src/LHFD.CatalogoDeProdutos.EventConsumer
RUN dotnet build LHFD.CatalogoDeProdutos.EventConsumer.csproj -c $BUILD_CONFIGURATION -o /app/build

# Publish stage
FROM build AS publish
RUN dotnet publish LHFD.CatalogoDeProdutos.EventConsumer.csproj -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Runtime stage
FROM mcr.microsoft.com/dotnet/runtime:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "LHFD.CatalogoDeProdutos.EventConsumer.dll"]

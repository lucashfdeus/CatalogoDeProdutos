# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj files and restore as distinct layers
COPY ["src/LHFD.CatalogoDeProdutos.EventConsumer/LHFD.CatalogoDeProdutos.EventConsumer.csproj", "src/LHFD.CatalogoDeProdutos.EventConsumer/"]
COPY ["src/LHFD.CatalogoDeProdutos.Business/LHFD.CatalogoDeProdutos.Business.csproj", "src/LHFD.CatalogoDeProdutos.Business/"]
RUN dotnet restore "src/LHFD.CatalogoDeProdutos.EventConsumer/LHFD.CatalogoDeProdutos.EventConsumer.csproj"

# Copy everything else and build
COPY . .
WORKDIR "/src/LHFD.CatalogoDeProdutos.EventConsumer"
RUN dotnet build "LHFD.CatalogoDeProdutos.EventConsumer.csproj" -c Release -o /app/build

# Publish stage
FROM build AS publish
RUN dotnet publish "LHFD.CatalogoDeProdutos.EventConsumer.csproj" -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/runtime:8.0
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "LHFD.CatalogoDeProdutos.EventConsumer.dll"]

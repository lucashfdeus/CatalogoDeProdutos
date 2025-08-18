# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj files and restore as distinct layers
COPY ["src/LHFD.CatalogoDeProdutos.Api/LHFD.CatalogoDeProdutos.Api.csproj", "src/LHFD.CatalogoDeProdutos.Api/"]
COPY ["src/LHFD.CatalogoDeProdutos.Data/LHFD.CatalogoDeProdutos.Data.csproj", "src/LHFD.CatalogoDeProdutos.Data/"]
COPY ["src/LHFD.CatalogoDeProdutos.Business/LHFD.CatalogoDeProdutos.Business.csproj", "src/LHFD.CatalogoDeProdutos.Business/"]
RUN dotnet restore "src/LHFD.CatalogoDeProdutos.Api/LHFD.CatalogoDeProdutos.Api.csproj"

# Copy everything else and build
COPY . .
WORKDIR "/src/LHFD.CatalogoDeProdutos.Api"
RUN dotnet build "LHFD.CatalogoDeProdutos.Api.csproj" -c Release -o /app/build

# Publish stage
FROM build AS publish
RUN dotnet publish "LHFD.CatalogoDeProdutos.Api.csproj" -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=publish /app/publish .
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080
ENTRYPOINT ["dotnet", "LHFD.CatalogoDeProdutos.Api.dll"]

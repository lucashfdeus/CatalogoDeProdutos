FROM mcr.microsoft.com/dotnet/runtime:8.0 AS base
USER $APP_UID
WORKDIR /app


FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/LHFD.CatalogoDeProdutos.EventConsumer/LHFD.CatalogoDeProdutos.EventConsumer.csproj", "src/LHFD.CatalogoDeProdutos.EventConsumer/"]
COPY ["src/LHFD.CatalogoDeProdutos.Business/LHFD.CatalogoDeProdutos.Business.csproj", "src/LHFD.CatalogoDeProdutos.Business/"]
RUN dotnet restore "./src/LHFD.CatalogoDeProdutos.EventConsumer/LHFD.CatalogoDeProdutos.EventConsumer.csproj"
COPY . .
WORKDIR "/src/src/LHFD.CatalogoDeProdutos.EventConsumer"
RUN dotnet build "./LHFD.CatalogoDeProdutos.EventConsumer.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./LHFD.CatalogoDeProdutos.EventConsumer.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "LHFD.CatalogoDeProdutos.EventConsumer.dll"]
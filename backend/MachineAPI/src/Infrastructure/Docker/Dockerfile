FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY MachineAPI.csproj .
RUN dotnet restore
COPY . .
RUN dotnet publish -c release -o /app MachineAPI.csproj

FROM base AS final
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "MachineAPI.dll"]
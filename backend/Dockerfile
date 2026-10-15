# 1. fázis: Építés (Build)
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["backend.csproj", "./"]
RUN dotnet restore "backend.csproj"

# Teljes kód másolása és publikálása
COPY . .
RUN dotnet publish "backend.csproj" -c Release -o /app/publish

# 2. fázis: Futtatás (Runtime)
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .

# .NET 8 esetén az alapértelmezett port a 8080
EXPOSE 8080
ENTRYPOINT ["dotnet", "backend.dll"] 
# (Ide is a te lefordított DLL-ed nevét írd!)
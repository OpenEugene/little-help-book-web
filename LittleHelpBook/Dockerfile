#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mvpstudio/dotnet:v01 as base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["Server/LittleHelpBook.Server.csproj", "Server/"]
COPY ["Shared/LittleHelpBook.Shared.csproj", "Shared/"]
COPY ["Client/LittleHelpBook.Client.csproj", "Client/"]
RUN dotnet restore "Server/LittleHelpBook.Server.csproj"
COPY . .
WORKDIR "/src/Server"
RUN dotnet build "LittleHelpBook.Server.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "LittleHelpBook.Server.csproj" -c Release -o /app/publish

FROM base AS final
USER mvp
WORKDIR /home/mvp/app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "LittleHelpBook.Server.dll"]
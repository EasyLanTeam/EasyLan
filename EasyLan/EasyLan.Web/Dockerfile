#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443


FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
RUN curl -sL https://deb.nodesource.com/setup_15.x | bash -
RUN apt-get install --assume-yes nodejs
WORKDIR /src
COPY ["EasyLan.Web/EasyLan.Web.csproj", "EasyLan.Web/"]
COPY ["EasyLan.LogicLayer/EasyLan.LogicLayer.csproj", "EasyLan.LogicLayer/"]
COPY ["EasyLan.DataLayer/EasyLan.DataLayer.csproj", "EasyLan.DataLayer/"]
RUN dotnet restore "EasyLan.Web/EasyLan.Web.csproj"
COPY . .
WORKDIR "/src/EasyLan.Web"
RUN dotnet build "EasyLan.Web.csproj" -c Release -o /app/build

FROM node:12-alpine as build-node
WORKDIR /app/wwwroot
COPY EasyLan-front .
RUN npm install
RUN npm run build


FROM build AS publish
RUN dotnet publish "EasyLan.Web.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY --from=build-node /app/wwwroot/dist wwwroot
CMD ASPNETCORE_URLS=http://*:$PORT dotnet EasyLan.Web.dll
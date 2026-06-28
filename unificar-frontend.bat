@echo off
chcp 65001 >nul
echo.
echo  Unificar frontend en una sola carpeta: shell
echo  =============================================
echo.
echo  IMPORTANTE: Cierra Cursor completamente antes de continuar.
echo.
pause

set ROOT=%~dp0
set VIEJA=%ROOT%Rediseño de página web

if not exist "%VIEJA%" (
  echo La carpeta "Rediseño de página web" ya no existe. Solo queda shell.
  pause
  exit /b 0
)

echo Eliminando copia duplicada "%VIEJA%" ...
rmdir /s /q "%VIEJA%"

if exist "%VIEJA%" (
  echo.
  echo [ERROR] No se pudo borrar. Cierra Cursor y cualquier terminal en esa carpeta.
  pause
  exit /b 1
)

echo.
echo Listo. Abre en Cursor esta carpeta:
echo   %ROOT%shell
echo.
pause

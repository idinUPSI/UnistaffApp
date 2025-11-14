#!/bin/bash
# Build Environment Check Script
# Skrip Semak Persekitaran Pembinaan

echo "================================"
echo "UPSI UniStaff - Build Environment Check"
echo "Semakan Persekitaran Pembinaan"
echo "================================"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
echo "1. Checking Node.js / Memeriksa Node.js..."
if command -v node &> /dev/null
then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓${NC} Node.js is installed: $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Node.js is NOT installed"
    echo "   Download from: https://nodejs.org/"
fi
echo ""

# Check npm
echo "2. Checking npm..."
if command -v npm &> /dev/null
then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✓${NC} npm is installed: $NPM_VERSION"
else
    echo -e "${RED}✗${NC} npm is NOT installed"
fi
echo ""

# Check Java
echo "3. Checking Java / Memeriksa Java..."
if command -v java &> /dev/null
then
    JAVA_VERSION=$(java -version 2>&1 | head -n 1)
    echo -e "${GREEN}✓${NC} Java is installed: $JAVA_VERSION"
else
    echo -e "${RED}✗${NC} Java is NOT installed"
    echo "   Android Studio includes JDK"
    echo "   Or download from: https://www.oracle.com/java/technologies/downloads/"
fi
echo ""

# Check ANDROID_HOME
echo "4. Checking ANDROID_HOME environment variable..."
if [ -n "$ANDROID_HOME" ]; then
    echo -e "${GREEN}✓${NC} ANDROID_HOME is set: $ANDROID_HOME"
    
    # Check if Android SDK exists
    if [ -d "$ANDROID_HOME" ]; then
        echo -e "${GREEN}✓${NC} Android SDK directory exists"
    else
        echo -e "${YELLOW}⚠${NC} ANDROID_HOME is set but directory does not exist"
    fi
else
    echo -e "${RED}✗${NC} ANDROID_HOME is NOT set"
    echo "   You need to set ANDROID_HOME to your Android SDK path"
    echo "   Anda perlu set ANDROID_HOME ke path Android SDK anda"
fi
echo ""

# Check for Android SDK tools
echo "5. Checking Android SDK tools..."
if command -v sdkmanager &> /dev/null
then
    echo -e "${GREEN}✓${NC} sdkmanager is available"
else
    echo -e "${YELLOW}⚠${NC} sdkmanager not found in PATH"
    echo "   Make sure Android SDK command-line tools are installed"
fi
echo ""

# Check for Gradle
echo "6. Checking Gradle..."
if [ -f "./android/gradlew" ]; then
    echo -e "${GREEN}✓${NC} Gradle wrapper found in project"
else
    echo -e "${YELLOW}⚠${NC} Gradle wrapper not found"
    echo "   Run 'npm run cap:sync' first"
fi
echo ""

# Summary
echo "================================"
echo "Summary / Ringkasan:"
echo "================================"

MISSING=0

if ! command -v node &> /dev/null; then
    echo -e "${RED}✗${NC} Install Node.js"
    MISSING=1
fi

if ! command -v java &> /dev/null; then
    echo -e "${RED}✗${NC} Install Java (JDK 17+)"
    MISSING=1
fi

if [ -z "$ANDROID_HOME" ]; then
    echo -e "${RED}✗${NC} Install Android Studio and set ANDROID_HOME"
    MISSING=1
fi

if [ $MISSING -eq 0 ]; then
    echo -e "${GREEN}✓${NC} All requirements appear to be met!"
    echo -e "${GREEN}✓${NC} Semua keperluan dipenuhi!"
    echo ""
    echo "You can now build the APK with:"
    echo "Anda kini boleh membina APK dengan:"
    echo ""
    echo "  npm install"
    echo "  npm run android:build"
else
    echo ""
    echo "Please install the missing requirements above."
    echo "Sila pasang keperluan yang hilang di atas."
    echo ""
    echo "Refer to BUILD_APK.md for detailed instructions."
    echo "Rujuk BUILD_APK.md untuk arahan terperinci."
fi

echo ""

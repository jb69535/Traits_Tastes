"use strict";
// interfaces.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWinePreferencesByMBTI = void 0;
// Function to retrieve wine grape preferences based on MBTI types
function getWinePreferencesByMBTI(mbti) {
    const preferences = {
        "ESTJ": ["Cabernet Sauvignon", "Merlot", "Chardonnay"],
        "ESFJ": ["Prosecco", "Pinot Noir", "Riesling"],
        "ESTP": ["Zinfandel", "Syrah", "Barbera"],
        "ESFP": ["Moscato", "Beaujolais", "Grenache"],
        "ENFJ": ["Prosecco", "Cabernet Franc", "Chardonnay"],
        "ENFP": ["Beaujolais", "Gewürztraminer", "Malbec"],
        "ENTJ": ["Shiraz", "Nebbiolo", "Bordeaux"],
        "ENTP": ["Zinfandel", "Sauvignon Blanc", "Barbera"],
        "ISTJ": ["Bordeaux", "Sauvignon Blanc", "Cabernet Franc"],
        "ISFJ": ["Merlot", "Chardonnay", "Pinot Grigio"],
        "ISTP": ["Shiraz", "Cabernet Sauvignon", "Malbec"],
        "ISFP": ["Riesling", "Rosé", "Pinot Noir"],
        "INTJ": ["Cabernet Sauvignon", "Barolo", "Bordeaux"],
        "INTP": ["Pinot Noir", "Chenin Blanc", "Riesling"],
        "INFJ": ["Merlot", "Pinot Grigio", "Syrah"],
        "INFP": ["Moscato", "Rosé", "Grenache"]
    };
    // Check if the MBTI type is present in the preferences mapping, otherwise return an empty array
    return preferences[mbti] || [];
}
exports.getWinePreferencesByMBTI = getWinePreferencesByMBTI;

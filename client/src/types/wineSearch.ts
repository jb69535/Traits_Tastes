// wineSearch.ts
// Author: Jun Beom

/**
 * Represents the detailed structure of a wine object used throughout the application to manage and display information about wines.
 * 
 * @remarks
 * This type definition is used to provide a comprehensive description of a wine's properties, including its identity, physical characteristics, and market details. This ensures that all parts of the application that handle wine data can rely on a consistent structure.
 * 
 * @property WineID - A unique identifier for the wine.
 * @property Title - The name or title of the wine.
 * @property Grape - The primary grape variety used in the wine.
 * @property SecondaryGrapeVarieties - Any additional grape varieties used.
 * @property Closure - The type of closure used on the wine bottle (e.g., cork, screw cap).
 * @property Country - The country where the wine is produced.
 * @property Region - The region within the country where the wine is produced.
 * @property Appellation - A legally defined and protected geographical indication used to identify where the grapes for a wine were grown.
 * @property Type - The general category of the wine (e.g., red, white, rosé).
 * @property Style - The style of the wine, which can include aspects like body, sweetness, and flavor profile.
 * @property Vintage - The year the grapes were harvested.
 * @property Price - The retail price of the wine.
 * @property characteristics - Descriptive characteristics of the wine, such as aroma, flavor notes, and body.
 * @property imageUrl - A URL to an image of the wine bottle or label.
 * ```
 */

export type Wine = {
    WineID: number;
    Title: string;
    Grape: string;
    SecondaryGrapeVarieties: string;
    Closure: string;
    Country: string;
    Region: string;
    Appellation: string;
    Type: string;
    Style: string;
    Vintage: string;
    Price: number;
    characteristics: string;
    imageUrl: string;
  };
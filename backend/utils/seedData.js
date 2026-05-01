/**
 * Database Seeding Script
 * Seeds realistic alcohol products and water batches for demo/testing.
 * Run: npm run seed
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import AlcoholProduct from '../models/AlcoholProduct.js';
import WaterBatch from '../models/WaterBatch.js';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/trustpulse';

// ════════════════════════════════════════════════════════════════
// Alcohol Products Seed Data
// ════════════════════════════════════════════════════════════════

const alcoholProducts = [
  {
    productCode: 'AX-7729-B1',
    productName: '18 Year Single Malt',
    brand: 'HIGHLAND RESERVE',
    batchNumber: 'HR-2023-B882',
    productionDate: 'Oct 14, 2023',
    distilleryLocation: 'Inverness, Scotland',
    intendedMarket: 'France',
    volume: '750ml',
    abv: '43% ABV',
    description: 'Authentic expression matured in Oloroso sherry casks. Registered for distribution within the European market.',
    scanCount: 4,
    scanLocations: [
      { location: 'Berlin, DE', timestamp: new Date(), source: 'Mobile App User' },
      { location: 'Paris, FR', timestamp: new Date(Date.now() - 5 * 3600000), source: 'Web Portal' },
      { location: 'Lyon, FR', timestamp: new Date(Date.now() - 72 * 3600000), source: 'Retail POS' },
    ],
    status: 'suspicious',
    custodyHistory: [
      { date: 'Today, 14:32 UTC', type: 'Consumer Scan', location: 'Berlin, DE', actor: 'Mobile App User', status: 'Cloned Scan', statusType: 'cloned' },
      { date: 'Today, 09:15 UTC', type: 'Consumer Scan', location: 'Paris, FR', actor: 'Web Portal', status: 'Cloned Scan', statusType: 'cloned' },
      { date: 'Oct 28, 08:00 UTC', type: 'Retail Received', location: 'Lyon, FR', actor: 'Boutique Vins', status: 'Verified', statusType: 'verified' },
      { date: 'Oct 25, 11:20 UTC', type: 'Customs Cleared', location: 'Calais, FR', actor: 'FR Customs Auth', status: 'Verified', statusType: 'verified' },
      { date: 'Oct 15, 16:45 UTC', type: 'Origin Encoded', location: 'Inverness, UK', actor: 'Distillery System', status: 'Genesis', statusType: 'genesis' },
    ],
  },
  {
    productCode: 'BV-4421-C3',
    productName: 'Château Margaux 2018',
    brand: 'CHÂTEAU MARGAUX',
    batchNumber: 'CM-2018-LOT-44',
    productionDate: 'Sep 2018',
    distilleryLocation: 'Margaux, Bordeaux, France',
    intendedMarket: 'Global',
    volume: '750ml',
    abv: '13.5% ABV',
    description: 'Premier Grand Cru Classé. Full-bodied Bordeaux with blackcurrant and violet notes.',
    scanCount: 1,
    scanLocations: [],
    status: 'genuine',
    custodyHistory: [
      { date: 'Nov 05, 10:00 UTC', type: 'Retail Received', location: 'London, UK', actor: 'Berry Bros & Rudd', status: 'Verified', statusType: 'verified' },
      { date: 'Oct 20, 14:30 UTC', type: 'Customs Cleared', location: 'Dover, UK', actor: 'UK Border Agency', status: 'Verified', statusType: 'verified' },
      { date: 'Sep 01, 2018 UTC', type: 'Origin Encoded', location: 'Margaux, FR', actor: 'Château Margaux', status: 'Genesis', statusType: 'genesis' },
    ],
  },
  {
    productCode: 'VK-9901-A2',
    productName: 'Crystal Premium Vodka',
    brand: 'CRYSTAL SPIRITS',
    batchNumber: 'CS-2024-V200',
    productionDate: 'Jan 08, 2024',
    distilleryLocation: 'Poznań, Poland',
    intendedMarket: 'North America',
    volume: '1L',
    abv: '40% ABV',
    description: 'Triple-distilled from premium wheat grain. Crystal clear with a smooth finish.',
    scanCount: 0,
    scanLocations: [],
    status: 'genuine',
    custodyHistory: [
      { date: 'Feb 15, 09:00 UTC', type: 'Distributor Received', location: 'New York, US', actor: 'Atlantic Spirits Co.', status: 'Verified', statusType: 'verified' },
      { date: 'Jan 28, 16:00 UTC', type: 'Customs Cleared', location: 'Port Newark, US', actor: 'US CBP', status: 'Verified', statusType: 'verified' },
      { date: 'Jan 08, 08:00 UTC', type: 'Origin Encoded', location: 'Poznań, PL', actor: 'Crystal Spirits Distillery', status: 'Genesis', statusType: 'genesis' },
    ],
  },
  {
    productCode: 'TQ-5532-D1',
    productName: 'Añejo Reserve Tequila',
    brand: 'CASA DEL SOL',
    batchNumber: 'CDS-2022-ANJ-88',
    productionDate: 'Mar 22, 2022',
    distilleryLocation: 'Jalisco, Mexico',
    intendedMarket: 'United States',
    volume: '750ml',
    abv: '38% ABV',
    description: 'Aged 18 months in American oak barrels. Rich vanilla and agave flavor profile.',
    scanCount: 0,
    scanLocations: [],
    status: 'genuine',
    custodyHistory: [
      { date: 'Aug 10, 2023 UTC', type: 'Retail Received', location: 'Los Angeles, US', actor: 'Total Wine', status: 'Verified', statusType: 'verified' },
      { date: 'Jul 20, 2023 UTC', type: 'Customs Cleared', location: 'Laredo, TX', actor: 'US CBP', status: 'Verified', statusType: 'verified' },
      { date: 'Mar 22, 2022 UTC', type: 'Origin Encoded', location: 'Jalisco, MX', actor: 'Casa del Sol NOM', status: 'Genesis', statusType: 'genesis' },
    ],
  },
  {
    productCode: 'GN-8810-E5',
    productName: 'London Dry Gin',
    brand: 'THORNBURY & CO',
    batchNumber: 'TC-2024-GIN-12',
    productionDate: 'Feb 01, 2024',
    distilleryLocation: 'London, England',
    intendedMarket: 'European Union',
    volume: '700ml',
    abv: '47% ABV',
    description: 'Craft distilled with 12 botanicals including juniper, coriander, and Seville orange peel.',
    scanCount: 0,
    scanLocations: [],
    status: 'genuine',
    custodyHistory: [
      { date: 'Mar 15, 2024 UTC', type: 'Distributor Received', location: 'Amsterdam, NL', actor: 'European Spirits BV', status: 'Verified', statusType: 'verified' },
      { date: 'Feb 01, 2024 UTC', type: 'Origin Encoded', location: 'London, UK', actor: 'Thornbury Distillery', status: 'Genesis', statusType: 'genesis' },
    ],
  },
];

// ════════════════════════════════════════════════════════════════
// Water Batches Seed Data
// ════════════════════════════════════════════════════════════════

const waterBatches = [
  {
    batchId: 'W-2023-89A',
    supplier: {
      name: 'AquaPure Solutions Ltd.',
      id: 'SPL-992-B',
      trustScore: 98,
      certifications: ['ISO 9001 Certified'],
      cleanRecord: '5-Year Clean Record',
      facility: 'Zurich, CH',
    },
    tds: 112,
    overallStatus: 'Clinically Safe',
    overallStatusDescription: 'This water batch meets all international safety parameters (WHO, EPA). No harmful contaminants detected above threshold limits.',
    reportStatus: 'FINALIZED',
    chemicalAnalysis: [
      { label: 'pH Level', target: 'Target: 6.5 – 8.5', value: '7.2', status: 'OPTIMAL', statusColor: '#16a34a' },
      { label: 'Lead (Pb)', target: 'Limit: < 0.01 mg/L', value: 'ND', status: 'SAFE', statusColor: '#16a34a' },
      { label: 'Arsenic (As)', target: 'Limit: < 0.01 mg/L', value: 'ND', status: 'SAFE', statusColor: '#16a34a' },
      { label: 'Fluoride (F)', target: 'Limit: < 1.5 mg/L', value: '0.4 mg/L', status: 'OPTIMAL', statusColor: '#16a34a' },
    ],
    scanTime: '08:42 AM UTC',
    certificate: { filename: 'Cert_W2023_89A.pdf', size: '1.2 MB', signed: true },
  },
  {
    batchId: 'W-2024-12B',
    supplier: {
      name: 'Nordic Springs AB',
      id: 'SPL-445-A',
      trustScore: 95,
      certifications: ['ISO 9001 Certified', 'EU Water Directive Compliant'],
      cleanRecord: '8-Year Clean Record',
      facility: 'Stockholm, SE',
    },
    tds: 85,
    overallStatus: 'Clinically Safe',
    overallStatusDescription: 'All parameters within optimal range. Sourced from protected glacial aquifer.',
    reportStatus: 'FINALIZED',
    chemicalAnalysis: [
      { label: 'pH Level', target: 'Target: 6.5 – 8.5', value: '7.0', status: 'OPTIMAL', statusColor: '#16a34a' },
      { label: 'Lead (Pb)', target: 'Limit: < 0.01 mg/L', value: 'ND', status: 'SAFE', statusColor: '#16a34a' },
      { label: 'Arsenic (As)', target: 'Limit: < 0.01 mg/L', value: 'ND', status: 'SAFE', statusColor: '#16a34a' },
      { label: 'Fluoride (F)', target: 'Limit: < 1.5 mg/L', value: '0.2 mg/L', status: 'OPTIMAL', statusColor: '#16a34a' },
    ],
    scanTime: '11:20 AM UTC',
    certificate: { filename: 'Cert_W2024_12B.pdf', size: '980 KB', signed: true },
  },
  {
    batchId: 'W-2024-33C',
    supplier: {
      name: 'Ganges Pure Filtration',
      id: 'SPL-781-C',
      trustScore: 72,
      certifications: ['BIS Certified'],
      cleanRecord: '2-Year Record',
      facility: 'Haridwar, IN',
    },
    tds: 320,
    overallStatus: 'Moderate Risk',
    overallStatusDescription: 'TDS is elevated but within acceptable limits. Fluoride slightly above optimal range.',
    reportStatus: 'UNDER REVIEW',
    chemicalAnalysis: [
      { label: 'pH Level', target: 'Target: 6.5 – 8.5', value: '7.8', status: 'OPTIMAL', statusColor: '#16a34a' },
      { label: 'Lead (Pb)', target: 'Limit: < 0.01 mg/L', value: 'ND', status: 'SAFE', statusColor: '#16a34a' },
      { label: 'Arsenic (As)', target: 'Limit: < 0.01 mg/L', value: '0.005 mg/L', status: 'SAFE', statusColor: '#16a34a' },
      { label: 'Fluoride (F)', target: 'Limit: < 1.5 mg/L', value: '1.3 mg/L', status: 'WARNING', statusColor: '#b45309' },
    ],
    scanTime: '06:15 AM UTC',
    certificate: { filename: 'Cert_W2024_33C.pdf', size: '1.5 MB', signed: true },
  },
  {
    batchId: 'W-2024-50D',
    supplier: {
      name: 'Alpine Mineral GmbH',
      id: 'SPL-223-D',
      trustScore: 99,
      certifications: ['ISO 9001 Certified', 'TÜV Tested'],
      cleanRecord: '12-Year Clean Record',
      facility: 'Innsbruck, AT',
    },
    tds: 68,
    overallStatus: 'Clinically Safe',
    overallStatusDescription: 'Premium glacial mineral water. Exceptionally low contamination levels across all metrics.',
    reportStatus: 'FINALIZED',
    chemicalAnalysis: [
      { label: 'pH Level', target: 'Target: 6.5 – 8.5', value: '6.8', status: 'OPTIMAL', statusColor: '#16a34a' },
      { label: 'Lead (Pb)', target: 'Limit: < 0.01 mg/L', value: 'ND', status: 'SAFE', statusColor: '#16a34a' },
      { label: 'Arsenic (As)', target: 'Limit: < 0.01 mg/L', value: 'ND', status: 'SAFE', statusColor: '#16a34a' },
      { label: 'Fluoride (F)', target: 'Limit: < 1.5 mg/L', value: '0.1 mg/L', status: 'OPTIMAL', statusColor: '#16a34a' },
    ],
    scanTime: '09:00 AM UTC',
    certificate: { filename: 'Cert_W2024_50D.pdf', size: '890 KB', signed: true },
  },
];

// ════════════════════════════════════════════════════════════════
// Seed Runner
// ════════════════════════════════════════════════════════════════

const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB for seeding');

    // Clear existing data
    await AlcoholProduct.deleteMany({});
    await WaterBatch.deleteMany({});
    console.log('🗑️  Cleared existing alcohol products and water batches');

    // Seed
    await AlcoholProduct.insertMany(alcoholProducts);
    console.log(`🍷 Seeded ${alcoholProducts.length} alcohol products`);

    await WaterBatch.insertMany(waterBatches);
    console.log(`💧 Seeded ${waterBatches.length} water batches`);

    console.log('\n✅ Database seeding complete!');
    console.log('\n📋 Available test codes:');
    console.log('   Alcohol: AX-7729-B1, BV-4421-C3, VK-9901-A2, TQ-5532-D1, GN-8810-E5');
    console.log('   Water:   W-2023-89A, W-2024-12B, W-2024-33C, W-2024-50D');
    console.log('   Sugar:   Use any real barcode (e.g., 3017620422003 for Nutella)');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedDB();

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding IRTH OS database...');

  // ─── ROLES ────────────────────────────────────
  const founderRole = await prisma.role.upsert({
    where: { name: 'FOUNDER' },
    update: {},
    create: {
      name: 'FOUNDER',
      displayName: 'الـمـؤسـس (Founder)',
      permissions: ['*'],
    },
  });

  const adminRole = await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: {
      name: 'ADMIN',
      displayName: 'مدير النظام (Administrator)',
      permissions: [
        'VIEW_USERS', 'CREATE_USER', 'EDIT_USER', 'MANAGE_ROLES',
        'VIEW_PRODUCTS', 'CREATE_PRODUCT', 'EDIT_PRODUCT', 'DELETE_PRODUCT',
        'VIEW_ORDERS', 'CREATE_ORDER', 'EDIT_ORDER', 'MANAGE_ORDER_STATUS',
        'VIEW_SUPPLIERS', 'CREATE_SUPPLIER', 'EDIT_SUPPLIER',
        'VIEW_INVENTORY', 'MANAGE_INVENTORY',
        'VIEW_SHIPPING', 'MANAGE_SHIPPING',
        'VIEW_MARKETING', 'CREATE_CAMPAIGN', 'EDIT_CAMPAIGN', 'MANAGE_COUPONS',
        'VIEW_FILES', 'UPLOAD_FILES', 'DELETE_FILES',
        'VIEW_ANALYTICS',
        'MANAGE_SETTINGS',
      ],
    },
  });

  const marketingStaffRole = await prisma.role.upsert({
    where: { name: 'STAFF_MARKETING' },
    update: {},
    create: {
      name: 'STAFF_MARKETING',
      displayName: 'فريق التسويق (Marketing)',
      permissions: [
        'VIEW_PRODUCTS',
        'VIEW_MARKETING', 'CREATE_CAMPAIGN', 'EDIT_CAMPAIGN', 'MANAGE_COUPONS',
        'VIEW_FILES', 'UPLOAD_FILES',
        'VIEW_ANALYTICS',
      ],
    },
  });

  const operationsStaffRole = await prisma.role.upsert({
    where: { name: 'STAFF_OPERATIONS' },
    update: {},
    create: {
      name: 'STAFF_OPERATIONS',
      displayName: 'فريق العمليات (Operations)',
      permissions: [
        'VIEW_ORDERS', 'EDIT_ORDER', 'MANAGE_ORDER_STATUS',
        'VIEW_SHIPPING', 'MANAGE_SHIPPING',
        'VIEW_INVENTORY', 'MANAGE_INVENTORY',
        'VIEW_SUPPLIERS',
        'VIEW_FILES', 'UPLOAD_FILES',
      ],
    },
  });

  const financeStaffRole = await prisma.role.upsert({
    where: { name: 'STAFF_FINANCE' },
    update: {},
    create: {
      name: 'STAFF_FINANCE',
      displayName: 'فريق المالية (Finance)',
      permissions: [
        'VIEW_ANALYTICS',
        'VIEW_ORDERS',
        'VIEW_SUPPLIERS',
        'VIEW_EXPENSES', 'MANAGE_EXPENSES',
      ],
    },
  });

  const supplierRole = await prisma.role.upsert({
    where: { name: 'SUPPLIER' },
    update: {},
    create: {
      name: 'SUPPLIER',
      displayName: 'مـورد (Supplier)',
      permissions: [
        'VIEW_OWN_BATCHES', 'MANAGE_OWN_BATCHES',
        'UPLOAD_FILES', 'VIEW_FILES',
      ],
    },
  });

  const distributorRole = await prisma.role.upsert({
    where: { name: 'DISTRIBUTOR' },
    update: {},
    create: {
      name: 'DISTRIBUTOR',
      displayName: 'مـوزع (Distributor)',
      permissions: [
        'VIEW_PRODUCTS', 'CREATE_B2B_ORDER', 'VIEW_OWN_ORDERS',
      ],
    },
  });

  const shippingPartnerRole = await prisma.role.upsert({
    where: { name: 'SHIPPING_PARTNER' },
    update: {},
    create: {
      name: 'SHIPPING_PARTNER',
      displayName: 'شريك الشحن (Shipping Partner)',
      permissions: [
        'VIEW_ASSIGNED_SHIPMENTS', 'UPDATE_SHIPMENT_STATUS',
      ],
    },
  });

  // ─── ADMIN USER ───────────────────────────────
  const hashedPassword = await bcrypt.hash('admin123', 12);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@irth.app' },
    update: {},
    create: {
      email: 'admin@irth.app',
      password: hashedPassword,
      name: 'Founder',
      roleId: founderRole.id,
    },
  });

  // ─── CATEGORIES ───────────────────────────────
  const skincare = await prisma.category.upsert({
    where: { slug: 'skincare' },
    update: {},
    create: { name: 'Skincare', nameAr: 'العناية بالبشرة', slug: 'skincare', sortOrder: 1 },
  });

  const haircare = await prisma.category.upsert({
    where: { slug: 'haircare' },
    update: {},
    create: { name: 'Haircare', nameAr: 'العناية بالشعر', slug: 'haircare', sortOrder: 2 },
  });

  const bodycare = await prisma.category.upsert({
    where: { slug: 'bodycare' },
    update: {},
    create: { name: 'Body Care', nameAr: 'العناية بالجسم', slug: 'bodycare', sortOrder: 3 },
  });

  // ─── SAMPLE PRODUCTS ─────────────────────────
  const product1 = await prisma.product.upsert({
    where: { slug: 'radiance-serum' },
    update: {},
    create: {
      name: 'Radiance Serum',
      nameAr: 'سيروم الإشراق',
      slug: 'radiance-serum',
      brand: 'IRTH',
      categoryId: skincare.id,
      description: 'Advanced vitamin C serum for radiant, glowing skin. Formulated with 15% L-Ascorbic Acid.',
      status: 'ACTIVE',
      basePrice: 450,
      comparePrice: 599,
      cost: 120,
      currency: 'EGP',
      tags: ['serum', 'vitamin-c', 'brightening'],
      isFeatured: true,
    },
  });

  await prisma.productVariant.upsert({
    where: { sku: 'RAD-SER-30ML' },
    update: {},
    create: {
      productId: product1.id,
      sku: 'RAD-SER-30ML',
      name: '30ml',
      attributes: { size: '30ml' },
      price: 450,
      cost: 120,
      stockQuantity: 100,
    },
  });

  await prisma.productVariant.upsert({
    where: { sku: 'RAD-SER-50ML' },
    update: {},
    create: {
      productId: product1.id,
      sku: 'RAD-SER-50ML',
      name: '50ml',
      attributes: { size: '50ml' },
      price: 650,
      cost: 180,
      stockQuantity: 50,
    },
  });

  const product2 = await prisma.product.upsert({
    where: { slug: 'hydra-cream' },
    update: {},
    create: {
      name: 'Hydra Moisturizer',
      nameAr: 'كريم الترطيب المكثف',
      slug: 'hydra-cream',
      brand: 'IRTH',
      categoryId: skincare.id,
      description: 'Deep hydration cream with hyaluronic acid and ceramides. For all skin types.',
      status: 'ACTIVE',
      basePrice: 350,
      comparePrice: 450,
      cost: 90,
      currency: 'EGP',
      tags: ['moisturizer', 'hydration', 'ceramides'],
      isFeatured: true,
    },
  });

  await prisma.productVariant.upsert({
    where: { sku: 'HYD-CRM-50ML' },
    update: {},
    create: {
      productId: product2.id,
      sku: 'HYD-CRM-50ML',
      name: '50ml',
      attributes: { size: '50ml' },
      price: 350,
      cost: 90,
      stockQuantity: 75,
    },
  });

  // ─── SAMPLE CUSTOMER ─────────────────────────
  const customerPassword = await bcrypt.hash('customer123', 12);
  await prisma.customer.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      email: 'customer@example.com',
      password: customerPassword,
      name: 'Demo Customer',
      phone: '+201234567890',
    },
  });

  // ─── SAMPLE SUPPLIER ─────────────────────────
  const supplierPassword = await bcrypt.hash('supplier123', 12);
  await prisma.supplier.upsert({
    where: { email: 'supplier@example.com' },
    update: {},
    create: {
      email: 'supplier@example.com',
      password: supplierPassword,
      name: 'Premium Labs',
      company: 'Premium Labs Manufacturing',
      country: 'India',
      status: 'APPROVED',
    },
  });

  // ─── SETTINGS ─────────────────────────────────
  await prisma.setting.upsert({
    where: { key: 'store_name' },
    update: {},
    create: { key: 'store_name', value: '"IRTH"', group: 'general' },
  });

  await prisma.setting.upsert({
    where: { key: 'store_currency' },
    update: {},
    create: { key: 'store_currency', value: '"EGP"', group: 'general' },
  });

  await prisma.setting.upsert({
    where: { key: 'shipping_default_cost' },
    update: {},
    create: { key: 'shipping_default_cost', value: '60', group: 'shipping' },
  });

  console.log('✅ Database seeded successfully!');
  console.log('');
  console.log('📧 Admin login: admin@irth.app / admin123');
  console.log('📧 Customer login: customer@example.com / customer123');
  console.log('📧 Supplier login: supplier@example.com / supplier123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export const specificationSheetTemplate = `
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <style>
      body {
        font-family: 'Helvetica', Arial, sans-serif;
        color: #1e293b;
        padding: 20px;
        line-height: 1.5;
        max-width: 800px;
        margin: 0 auto;
      }
      .header {
        width: 100%;
        border-bottom: 2px solid #e2e8f0;
        padding-bottom: 15px;
        margin-bottom: 30px;
      }
      .title {
        font-size: 24px;
        font-weight: bold;
        color: #0f172a;
      }
      .meta {
        font-size: 12px;
        color: #64748b;
        text-align: right;
      }
      .product-block {
        margin-bottom: 50px;
        page-break-inside: avoid;
      }
      .product-box {
        background-color: #f8fafc;
        border: 1px solid #e2e8f0;
        padding: 20px;
        border-radius: 8px 8px 0 0;
        border-bottom: none;
      }
      .product-name {
        font-size: 20px;
        font-weight: bold;
        color: #0f172a;
        margin-bottom: 6px;
      }
      .product-desc {
        font-size: 14px;
        color: #475569;
      }
      .section-title {
        font-size: 12px;
        font-weight: bold;
        padding: 12px 20px;
        background-color: #e2e8f0;
        color: #475569;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        border-left: 1px solid #e2e8f0;
        border-right: 1px solid #e2e8f0;
      }
      .brand-table {
        width: 100%;
        border-collapse: collapse;
      }
      .brand-row {
        border: 1px solid #e2e8f0;
      }
      .brand-cell {
        padding: 14px 20px;
        vertical-align: middle;
        font-size: 14px;
      }
      .brand-img {
        width: 55px;
        height: 55px;
        object-fit: contain;
        border-radius: 4px;
        background-color: #fff;
        border: 1px solid #f1f5f9;
      }
      .brand-name {
        font-weight: bold;
        color: #0f172a;
        margin-bottom: 2px;
      }
      .brand-detail {
        color: #64748b;
        font-size: 12px;
      }
      .price-text {
        font-weight: bold;
        text-align: right;
        color: #0f172a;
        font-size: 15px;
        width: 120px;
      }
      .summary-box {
        background-color: #0f172a;
        color: #ffffff;
        padding: 18px 20px;
        border-radius: 0 0 8px 8px;
        width: 100%;
        border-collapse: collapse;
      }
      .summary-title {
        font-size: 14px;
        font-weight: bold;
        color: #ffffff;
      }
      .summary-subtitle {
        font-size: 11px;
        color: #94a3b8;
      }
      .total-price {
        font-size: 22px;
        font-weight: bold;
        color: #38bdf8;
        text-align: right;
      }
    </style>
  </head>
  <body>
    <table class="header">
      <tr>
        <td><div class="title">PROMINNO LABS</div></td>
        <td class="meta">
          <strong>Master Specification Sheet</strong><br />
          Date: {{generationDate}}<br />
          Seller Ref: #{{sellerId}}
        </td>
      </tr>
    </table>

    {{#each products}}
    <div class="product-block">
      <div class="product-box">
        <div class="product-name">{{this.name}}</div>
        <div class="product-desc">{{this.description}}</div>
      </div>

      <div class="section-title">Associated Brand Configurations</div>
      <table class="brand-table">
        {{#each this.brands}}
        <tr class="brand-row">
          <td class="brand-cell" style="width: 60px">
            <img
              class="brand-img"
              src="{{this.imagePath}}"
              alt="Logo"
              onerror="this.src = 'https://placehold.co/100x100?text=No+Image'"
            />
          </td>
          <td class="brand-cell">
            <div class="brand-name">{{this.name}}</div>
            <div class="brand-detail">{{this.detail}}</div>
          </td>
          <td class="brand-cell price-text">₹{{this.price}}</td>
        </tr>
        {{/each}}
      </table>

      <table class="summary-box">
        <tr>
          <td>
            <div class="summary-title">Cumulative Value Summary</div>
            <div class="summary-subtitle">Calculated sum of all active brand configurations</div>
          </td>
          <td class="total-price">₹{{this.totalPrice}}</td>
        </tr>
      </table>
    </div>
    {{/each}}
  </body>
</html>
`;

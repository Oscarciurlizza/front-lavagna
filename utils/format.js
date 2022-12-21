export const formatMoney = amount => {
    return amount.toLocaleString('es-PE', {
        style: 'currency',
        currency: 'PEN'
      });
  }
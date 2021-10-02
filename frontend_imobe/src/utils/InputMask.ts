export const currency = (value: string): string => {
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d)(\d{2})$/, "$1,$2");
  value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");

  return value;
};

export const cpf = (value: string): string => {
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{3})(\d)/g, "$1.$2");
  value = value.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
  value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
  value = value.replace(
    /^(\d{3})\.(\d{3})\.(\d{3})\/(\d{2})(\d)/,
    "$1.$2.$3-$4"
  );
  return value.substring(0, 14);
};

export const phone = (value: string): string => {
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
  value = value.replace(/^(\d{2})\ (\d{1})\ (\d{4})(\d)/g, "($1) $2 $3");
  value = value.replace(
    /^(\d{2})(\d{1})(\d{4})\-(\d{4})(\d)/g,
    "($1) $2 $3-$4"
  );
  return value.substring(0, 14);
};

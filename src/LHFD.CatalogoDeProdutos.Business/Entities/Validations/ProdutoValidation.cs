using FluentValidation;

namespace LHFD.CatalogoDeProdutos.Business.Entities.Validations
{
    public class ProdutoValidation : AbstractValidator<Produto>
    {
        public ProdutoValidation()
        {
            RuleFor(x => x.Codigo)
                .NotEmpty().WithMessage("O campo {PropertyName} deve ser fornecido")
                .Length(2, 200).WithMessage("O campo {PropertyName} deve ter entre {MinLength} e {MaxLength} caracteres");

            RuleFor(x => x.Descricao)
                .NotEmpty().WithMessage("O campo {PropertyName} deve ser fornecido")
                .Length(2, 1000).WithMessage("O campo {PropertyName} deve ter entre {MinLength} e {MaxLength} caracteres");

            RuleFor(x => x.Preco)
                .NotNull().WithMessage("O campo {PropertyName} deve ser fornecido")
                .GreaterThan(0).WithMessage("O campo {PropertyName} deve ser maior que zero");

            RuleFor(x => x.IdDepartamento)
             .NotEmpty().WithMessage("O campo {PropertyName} deve ser fornecido")
             .GreaterThan(0).WithMessage("O campo {PropertyName} deve ser maior que zero");
        }
    }
}

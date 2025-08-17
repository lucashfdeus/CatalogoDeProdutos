using FluentValidation;
using LHFD.CatalogoDeProdutos.Business.Dtos;

namespace LHFD.CatalogoDeProdutos.Business.Entities.Validations
{
    public class DepartamentoValidation : AbstractValidator<Departamento>
    {
        public DepartamentoValidation()
        {
            RuleFor(x => x.Id)
               .NotEmpty().WithMessage("O campo {PropertyName} deve ser fornecido")
               .GreaterThan(0).WithMessage("O campo {PropertyName} deve ser maior que zero");

            RuleFor(x => x.Nome)
               .NotEmpty().WithMessage("O campo {PropertyName} deve ser fornecido")
               .Length(2, 255).WithMessage("O campo {PropertyName} deve ter entre {MinLength} e {MaxLength} caracteres");
        }
    }
}

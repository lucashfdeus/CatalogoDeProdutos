using System.ComponentModel.DataAnnotations;

namespace LHFD.ProductCatalog.Business.Entities
{
    public abstract class Entity
    {
        protected Entity() => Id = Guid.NewGuid();        

        [Key]
        public Guid Id { get; set; }
    }
}

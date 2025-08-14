namespace LHFD.ProductCatalog.Business.Interfaces
{
    public interface IUnitOfWork
    {
        Task<bool> Commit();
    }
}

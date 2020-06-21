using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Runtime.CompilerServices;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace LittleHelpBook.Client.Services
{
    public abstract class BaseCache : INotifyPropertyChanged
    {

        protected HttpClient Http;

        public BaseCache(HttpClient http) {
            Http = http;
        }

        public event EventHandler CacheUpdated;
        protected void OnCacheUpdated() => CacheUpdated?.Invoke(this, new EventArgs());

        #region INotify
        public event PropertyChangedEventHandler PropertyChanged;

        protected void OnPropertyChanged(string propertyName) 
            => PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));

        protected bool SetField<T>(ref T field, T value, [CallerMemberName] string propertyName = null)
        {
            if (EqualityComparer<T>.Default.Equals(field, value)) return false;
            field = value;
            OnPropertyChanged(propertyName);
            return true;
        }
        #endregion

    }
}

import fs from "fs";
import path from "path";

const ATOLYE = "/Users/ozel/Çoklu Web site/masif-atolye";

// 79 unique Turkish series names for desk clocks
const MODELS = {
  1:  { name: "Akasya", slug: "masa-saati-akasya", badge: "🌿 Doğal & Sade", desc: "Açık ahşap tonu ve yalın çizgileriyle masanıza huzur getirir. Her tahta lifinde doğanın sessiz sesini duyabilirsiniz.", room: "minimalist home office desk", philosophy: "Akasya Serisi, aşırılıktan arınmış bir tasarım anlayışını benimser. Doğanın sadeliği, masanızın üzerinde zarif bir duruş kazanır.", points: ["Minimalist ve modern iç mekânlarla uyum", "Ofis masası için ideal boyut ve form", "Açık ahşap tonu her ortama ışık katar", "Sessiz mekanizma odak bozulmasını önler"] },
  2:  { name: "Servi", slug: "masa-saati-servi", badge: "🌲 Uzun & İnce", desc: "İnce ve zarif formuyla masanızda dikey bir vurgu yaratır. Servi ağacının özgün duruşundan ilham alan yapısı göz alıcıdır.", room: "cozy wooden study room with bookshelves", philosophy: "İnceliğin çarpıcı olabileceğini kanıtlayan Servi Serisi, dar çalışma köşeleri için biçilmiş kaftan.", points: ["Dar ve dikey form, az yer kaplar", "Çalışma odası ve kütüphane raflarına uyumlu", "Kitap koleksiyonuyla estetik bütünlük", "Minimal rakam tasarımı modern bir dil sunar"] },
  3:  { name: "Meşe", slug: "masa-saati-mese", badge: "🏛️ Güçlü & Klasik", desc: "Meşe ruhunun sağlamlığı ve asaleti masaüstü saate yansıyor. Köklü bir estetik, her masada güven verir.", room: "elegant executive office with dark wood furniture", philosophy: "Meşe Serisi, asırlık meşe ağacının dayanıklılık ve asalet simgesini tasarım diline taşır. Kurumsal güç için mükemmel bir ifade.", points: ["Kurumsal ve yönetici masaları için ideal", "Koyu ahşap tonlarıyla zengin uyum", "Roma rakamları klasik bir hava sunar", "Ağır ve kaliteli hissi fark yaratır"] },
  4:  { name: "Huş", slug: "masa-saati-hus", badge: "🍂 Hafif & Şiirsel", desc: "Huş ağacının beyazımsı tonu ve zarif damarlarıyla masanızda şiirsel bir iz bırakır.", room: "modern living room side table Scandinavian decor", philosophy: "İskandinav ormanlarının ilham kaynağı huş ağacı, bu seride masanızı huzurlu bir köşeye dönüştürür.", points: ["Açık ton İskandinav tarzı dekorlarla uyumlu", "Yatak odası ve oturma odası için ideal", "Hafif formu yerden yüksek raflarda şık durur", "Sessiz mekanizma gece huzurunu korur"] },
  5:  { name: "Çınar", slug: "masa-saati-cinar", badge: "🌳 Anıtsal & Güçlü", desc: "Şehrin çınarları gibi zamana meydan okur. Köklü ve güçlü bir tasarım, masanızda tarihin sesini taşır.", room: "rustic farmhouse kitchen counter stone walls", philosophy: "Çınar Serisi, yüzyıllık çınar ağaçlarının sağlam duruşundan ilham alır. Geçicilik değil, kalıcılık felsefesidir.", points: ["Kırsal ve doğal dekorlarla mükemmel uyum", "Kahverengi sıcak tonlar mutfağa karakter katar", "Güçlü ahşap yapı uzun ömür garantisi", "Hediye kutusunda şık bir sunum seçeneği"] },
  6:  { name: "Ocak", slug: "masa-saati-ocak", badge: "🔥 Sıcak & Samimi", desc: "Bir şömine başındaki sıcaklığı masanıza taşır. Ocak Serisi, her bakışta içinizi ısıtır.", room: "luxurious bedroom nightstand silk bedding", philosophy: "Ev sıcaklığının simgesi ocaktan ilham alan bu seri, yaşam alanlarına yürek dolduran bir sıcaklık katar.", points: ["Yatak odası komodinine mükemmel uyum", "Sıcak ahşap tonu dinlendirici atmosfer yaratır", "Sessiz mekanizma uyku kalitesini korur", "Kişiselleştirme ile anlamlı bir hediye olur"] },
  7:  { name: "Nehir", slug: "masa-saati-nehir", badge: "🌊 Akıcı & Sakin", desc: "Nehir gibi sonsuz akar, dinginlik taşır. Ahşabın damar çizgileri su akışını andıran bir estetik yaratır.", room: "bright airy sunroom with indoor plants", philosophy: "Nehir Serisi, suyun özgür akışından ilham alır. Sakin ve sürekli — tıpkı zaman gibi.", points: ["Doğal ışık alan mekânlarda muhteşem görünüm", "Bitki köşeleriyle organik bir uyum", "Açık renkli ahşap tonu mekânı aydınlatır", "Sade ama etkileyici bir tasarım dili"] },
  8:  { name: "Bozkır", slug: "masa-saati-bozkirr", badge: "🏜️ Serbest & Uçsuz", desc: "Uçsuz bucaksız bozkırın özgürlüğünü masanıza taşır. Sınırsız ufukların sessizliği her tiktak'ta hissedilir.", room: "industrial loft desk exposed brick wall", philosophy: "Bozkır Serisi, açık ufukların ve yalnız güzelliğin tasarım yorumudur. Endüstriyel mekânlarda güçlü bir karakter kazanır.", points: ["Endüstriyel ve loft mekânlarıyla güçlü uyum", "Doğal tuğla dokularıyla estetik diyalog", "Ham ve özgün ahşap estetiği", "Saat kadranı bozkırın sakinliğini yansıtır"] },
  9:  { name: "Toprak", slug: "masa-saati-toprak", badge: "🌍 Kökler & Özgünlük", desc: "Toprağın sıcak kahverengi tonlarında, köklerine bağlı bir tasarım. Her ahşap parçası toprağın kokusunu taşır.", room: "traditional Turkish study room with kilim carpet", philosophy: "Toprak Serisi, geleneksel Türk evlerinin sıcaklığından ilham alır. Kilim ve ahşabın buluştuğu noktada özgün bir estetik doğar.", points: ["Geleneksel ve Anadolu tarzı mekânlarla uyum", "Kilim ve el dokuması tekstillerle diyalog", "Koyu toprak tonları samimi bir sıcaklık verir", "Lazer kazıma ile aile ismi eklenebilir"] },
  10: { name: "Duman", slug: "masa-saati-duman", badge: "🌫️ Gizemli & Derin", desc: "Duman gibi gizemli, ahşabın gri tonlarında derinlik hissiyatı. Modern mekânlarda çarpıcı bir odak noktası.", room: "zen meditation room bamboo and stone", philosophy: "Duman Serisi, görünür ile görünmez arasındaki sınırı siler. Meditasyon köşelerinde zihin sakinleştirici bir etki yaratır.", points: ["Zen ve meditasyon köşeleri için ideal", "Gri ve nötr tonlarla sessiz bir uyum", "Bambu ve taş dokularıyla doğal diyalog", "Sade kadran dinginliği pekiştirir"] },
  11: { name: "Petek", slug: "masa-saati-petek", badge: "🍯 Altın & Tatlı", desc: "Bal peteğinin geometrik güzelliğinden ilham alan bu seri, altın sarısı ahşap tonlarıyla masanıza sıcaklık getirir.", room: "contemporary open-plan office glass walls city view", philosophy: "Petek Serisi, doğanın mükemmel geometrisini modern tasarıma taşır. Açık ofis alanlarında altın bir parıltı yaratır.", points: ["Modern ofis alanlarına sıcaklık katar", "Şehir manzaralı mekânlarda parlayan bir detay", "Altın ahşap tonu prestij hissi verir", "Açık ve aydınlık mekânlarla kusursuz uyum"] },
  12: { name: "Göl", slug: "masa-saati-gol", badge: "💧 Durgun & Derin", desc: "Derin bir gölün sakinliği ve derinliği. Koyu ton ahşabın suyun derinliğini andıran rengi ilgi çekicidir.", room: "warm family living room fireplace mantel", philosophy: "Göl Serisi, durgunluğun güzelliğini yansıtır. Şömine rafında ailenin kalbi gibi atar.", points: ["Şömine rafında görsel odak noktası", "Aile oturma odaları için ideal boyut", "Koyu ton ahşap derin bir karakter katar", "Lazer kazıma ile aile anısı bırakılabilir"] },
  13: { name: "Şafak", slug: "masa-saati-safak", badge: "🌅 Yeni Başlangıç", desc: "Her sabahı hatırlatan bu seri, günün ilk ışığının ahşap üzerindeki yansımasını simgeler.", room: "boho chic bedroom with macrame wall art", philosophy: "Şafak Serisi, her yeni günün umudunu masanıza taşır. Bohem ruhlu mekânlarda özgür bir enerji yayar.", points: ["Bohem ve yaratıcı mekânlarla harika uyum", "Açık kahve tonları sabah ışığını çağrıştırır", "Yatak odası rafı veya konsol üstünde şık", "El dokuması tekstillerle organik bütünlük"] },
  14: { name: "Bora", slug: "masa-saati-bora", badge: "💨 Enerjik & Dinamik", desc: "Bora fırtınasının enerjisi ahşabın damarlarında gizli. Dinamik çizgilerle masanıza hareket kazandırır.", room: "pharmacy or medical clinic reception desk", philosophy: "Bora Serisi, güç ve hareket enerjisini tasarım diline dönüştürür. Profesyonel mekânlarda özgüven verir.", points: ["Klinik ve profesyonel mekânlar için ideal", "Temiz ve güven verici bir görünüm", "Koyu ahşap ton otoriteyi pekiştirir", "Bakımı kolay yüzey kalıcı güzellik sunar"] },
  15: { name: "Lale", slug: "masa-saati-lale", badge: "🌷 Zarif & Narin", desc: "Lale'nin zarif duruşu ve kırmızı-kahverengi tonların uyumu. Narin ama güçlü bir tasarım karakteri.", room: "boutique hotel bedside table marble decor", philosophy: "Lale Serisi, Osmanlı'nın lale kültüründen ilham alarak zarif bir tasarım şiiri yazar. Butik mekânlarda çiçek gibi açar.", points: ["Butik otel ve lüks mekânlar için ideal", "Mermer yüzeylerle zarif bir kontrast", "Narin form asaleti ima eder", "Kurumsal hediye olarak öne çıkar"] },
  16: { name: "Mercan", slug: "masa-saati-mercan", badge: "🪸 Deniz & Derinlik", desc: "Derinlik, renk ve organik form. Mercan rengi ahşap tonları ve özgün doku denizin canlılığını yansıtır.", room: "art studio wooden workbench creative clutter", philosophy: "Mercan Serisi, doğanın renkli canlılığından beslenip sanata dönüşür. Yaratıcı mekânlarda sınırları zorlar.", points: ["Sanat atölyesi ve yaratıcı mekânlarda özgün bir detay", "Turuncu-kahve tonlar sıcak bir enerji yayar", "Organik doku benzersiz bir karakter taşır", "Her saat bir sanat eseri gibi eşsizdir"] },
  17: { name: "Çimen", slug: "masa-saati-cimen", badge: "🌱 Taze & Canlı", desc: "Çimenin tazeliğini ve yeşilimsi-sarı ahşap tonunu masanıza taşır. Canlı ve ferahlatıcı bir enerji.", room: "coffee shop wooden counter warm ambient light", philosophy: "Çimen Serisi, bir fincan kahvenin yanındaki sıcaklık gibi — ferah, taze ve davetkar.", points: ["Kafe ortamlarında mükemmel bir atmosfer detayı", "Sıcak ahşap ve doğal ışıkla kusursuz uyum", "Misafirlere canlı ve samimi bir mesaj verir", "Küçük boyutu tezgah üstü için ideal"] },
  18: { name: "Yıldız", slug: "masa-saati-yildiz", badge: "⭐ Işıltılı & Özel", desc: "Karanlıkta bile ışıldayan bir yıldız gibi. Açık ahşap tonu ışıkla dans eder, mekânı canlandırır.", room: "vintage library reading nook leather armchair", philosophy: "Yıldız Serisi, okuma köşelerini aydınlatır. Deri koltukla buluşan ahşap, klasiklerin ötesine geçen bir sofistike yaratır.", points: ["Kütüphane ve okuma köşeleri için mükemmel", "Deri ve ahşap malzeme uyumuyla sofistike his", "Açık ahşap ton karanlık ortamlarda parlar", "Sevilen birine anlamlı bir okuma hediyesi"] },
  19: { name: "Dağ", slug: "masa-saati-dag", badge: "⛰️ Sağlam & Heybetli", desc: "Dağların azametini, sağlamlığını ve doğasını küçük bir forma sığdırdık. Masanızda bir zirve hissi.", room: "coastal beach house sideboard white and blue tones", philosophy: "Dağ Serisi, yüksekliğin ve sağlamlığın simgesi. Sahil evlerinde bile bir dağ ufku hissi yaratır.", points: ["Sahil ve deniz temalı mekânlarda etkileyici kontrast", "Koyu ahşap mavi-beyaz tonları tamamlar", "Sağlam form uzun ömürlü bir yatırım", "Doğa seven ruhlar için biçilmiş kaftan"] },
  20: { name: "Orman", slug: "masa-saati-orman", badge: "🌲 Derinlik & Zenginlik", desc: "Ormanın koyu ve zengin ahşap renk skalası. Derin tonlar ve yoğun damarlar ormanın içindeymiş hissini verir.", room: "modern kitchen marble island pendant lights", philosophy: "Orman Serisi, mutfak tezgahlarında beklenmedik bir doğa parçasıdır. Mermerin soğukluğunu ahşabın sıcaklığıyla dengeler.", points: ["Mutfak tezgahı ve adası üzerinde özgün bir detay", "Mermer yüzeylerle şaşırtıcı güzel kontrast", "Koyu ahşap ton prestij hissi verir", "Hediye paketi seçeneği ile özel bir armağan"] },
  21: { name: "Taş", slug: "masa-saati-tas", badge: "🪨 Kaba & Özgün", desc: "Taşın ham güzelliğinden esinlenilmiş mat ve doğal dokulu yüzeyiyle benzersiz bir karakter.", room: "child's playroom wooden shelf colorful toys", philosophy: "Taş Serisi, ham doğallığı ve çocuksu neşeyi bir arada sunar. Renkli bir ortamda bile öne çıkan özgün duruşuyla ilgi çeker.", points: ["Oyun odalarında çocuğun merakını besler", "Dayanıklı yapı çocuklu evler için idealdir", "Ahşap ve doğal malzemelere ilgi uyandırır", "Eğitici saat öğreniminde eğlenceli bir araç"] },
  22: { name: "Rüzgar", slug: "masa-saati-ruzgar", badge: "💨 Özgür & Hafif", desc: "Rüzgarın özgürlüğü ve hafifliği ahşabın narin çizgilerinde. Masanızda nefes alan bir tasarım.", room: "yoga studio bamboo shelf candles and stones", philosophy: "Rüzgar Serisi, özgürlük ve akış enerjisini yoga pratiğinin sakinliğiyle buluşturur.", points: ["Yoga ve meditasyon stüdyoları için uyumlu", "Bambu ve taş ile organik bir bütünlük", "Hafif formun görsel hafifliği odaya nefes aldırır", "Mum ışığında sıcak bir parlaklık kazanır"] },
  23: { name: "Ay", slug: "masa-saati-ay", badge: "🌙 Gizemli & Romantik", desc: "Ay ışığının soluk parlaklığı ahşabın açık tonlarında. Gece masanıza romantik bir ambiyans katar.", room: "wine cellar stone shelf dim warm light", philosophy: "Ay Serisi, gecenin gizemine eşlik eder. Şarap mahzeninin loş ışığında kadim bir şiir gibi durur.", points: ["Loş ve romantik mekânlarda etkili", "Taş ve doğal yüzeylerle özgün uyum", "Gece açık kalan mekânlarda odak noktası", "Romantik bir kutlama için benzersiz hediye"] },
  24: { name: "Safran", slug: "masa-saati-safran", badge: "🌼 Altın & Değerli", desc: "Safranın değerli sarı-altın tonları ahşabın ışıl ışıl yüzeyinde. Her bakışta bir hazine hissi.", room: "rooftop terrace outdoor table golden hour light", philosophy: "Safran Serisi, altın saatin ışığını masanıza hapseder. Altın saat fotoğrafının ahşaba yansıması gibi.", points: ["Teras ve dış mekân masalarında muhteşem", "Altın saat ışığıyla büyülü bir uyum", "Dış mekâna dayanıklı koruma kaplaması", "Gün batımı etkinliklerinde odak noktası"] },
  25: { name: "Bakır", slug: "masa-saati-bakir", badge: "🟤 Sıcak & Metal", desc: "Bakırın sıcak kırmızı-kahverengi tonu ahşabın damarlarıyla dans eder. Endüstriyel estetiğin sıcak yorumu.", room: "Scandinavian nursery white shelf soft pastels", philosophy: "Bakır Serisi, sıcaklığı ve soğukluğu bir araya getirir. Pastellerin yumuşaklığında güçlü bir kimlik taşır.", points: ["Çocuk odaları için güvenli ve dayanıklı malzeme", "Pastel renklerle sürpriz güzel bir kontrast", "Sıcak ton bebeğin odasına huzur katar", "Armağan paketi ile bir doğum hediyesi olur"] },
  26: { name: "Kestane", slug: "masa-saati-kestane", badge: "🌰 Sonbahar & Sıcaklık", desc: "Kestane kahvesinin zengin tonları sonbaharın sıcaklığını masanıza taşır. Nostalji dolu bir his.", room: "mountain cabin wooden table pine forest view", philosophy: "Kestane Serisi, dağ kulübesinin samimi ruhunu ve ormanlık manzarayı doğrudan masanıza taşır.", points: ["Dağ ve köy evi ortamlarında mükemmel uyum", "Kızılçam ve çam ağaçlarıyla ahşap diyaloğu", "Sonbahar ve kış sezonlarında özel bir his", "Hediye kutusunda sonbahar temalı bir sürpriz"] },
  27: { name: "Çakıl", slug: "masa-saati-cakil", badge: "🪨 Yuvarlak & Sakin", desc: "Nehir taşlarının yuvarlak formundan esinlenilmiş. Pürüzsüz yüzey ve sakin görüntüsüyle beden ve ruh için denge.", room: "museum display pedestal gallery lighting", philosophy: "Çakıl Serisi, bir heykel gibi sergilenmeyi hak eder. Galeri aydınlatmasında her açıdan farklı bir yüz sunar.", points: ["Müze ve galeri sergi alanlarında ideal", "Heykel gibi her açıdan estetik bir görünüm", "Galeri aydınlatmasında çarpıcı gölge oyunları", "Koleksiyonculara özel sınırlı üretim hissi"] },
  28: { name: "Kar", slug: "masa-saati-kar", badge: "❄️ Beyaz & Temiz", desc: "Karın beyazlığından ilham alan açık ve temiz ahşap tonu. Bir sonbahar karının masanıza dokunuşu.", room: "luxury spa reception white marble counter", philosophy: "Kar Serisi, temizliğin ve safiyetin temsilcisi. Lüks spa ortamlarında saf bir sessizlik sunar.", points: ["Spa ve wellness mekânlarında arındırıcı his", "Beyaz mermerle neredeyse mükemmel uyum", "Açık ton aydınlık ve ferah bir ambiyans yaratır", "Müşterilere huzur ve güven mesajı verir"] },
  29: { name: "Çay", slug: "masa-saati-cay", badge: "🍵 Sıcak & Davetkar", desc: "Sıcak çay fincanı gibi davetkar. Koyu amber rengi ahşap tonu her günü daha anlamlı kılar.", room: "modern restaurant bar wooden surface", philosophy: "Çay Serisi, paylaşılan anların, sohbetlerin ve sıcak karşılaşmaların simgesi. Restoranların ruhu olur.", points: ["Restoran ve kafe bar tezgahlarına mükemmel", "Koyu amber ton sofistike ve davetkar", "Her konuğa sıcak bir karşılama mesajı verir", "Ambiyans aydınlatmasıyla zenginleşen ahşap tonu"] },
  30: { name: "Demir", slug: "masa-saati-demir", badge: "⚙️ Güçlü & Endüstriyel", desc: "Demirin gücü ahşabın sıcaklığıyla buluşuyor. Ham, endüstriyel ve dayanıklı bir tasarım ifadesi.", room: "home gym locker room shelf clean athletic aesthetic", philosophy: "Demir Serisi, disiplin ve güç değerlerini tasarımla ifade eder. Spor mekânlarında motivasyon verir.", points: ["Spor salonu ve aktif mekânlarda güç hissi", "Locker odaları için ideal boyut", "Dayanıklı malzeme ağır kullanıma uygun", "Sporseverlere özel anlamlı bir hediye"] },
  31: { name: "Sedef", slug: "masa-saati-sedef", badge: "🐚 Naif & İnce", desc: "Sedefin inci beyazı parlaklığından esinlenilmiş. Işıkla dans eden açık ahşap tonu benzersiz bir parlaklık sunar.", room: "dark moody home cinema shelf velvet curtains", philosophy: "Sedef Serisi, karanlıkta en çok parlayan güzelliğin temsilcisidir. Koyu kadife perdelerin önünde bir inci gibi görünür.", points: ["Koyu ve sinematik mekânlarda çarpıcı kontrast", "Kadife ve ipek dokularıyla lüks uyum", "Karanlık ortamda ışık kaynağı gibi parlar", "Sinema odasına sofistike bir dokunuş"] },
  32: { name: "Vişne", slug: "masa-saati-visne", badge: "🍒 Canlı & Asil", desc: "Vişnenin koyu kırmızı tonu ahşabın sıcaklığıyla birleşiyor. Asil bir kırmızının derinliği masanıza ruh katar.", room: "garden conservatory iron shelf tropical plants", philosophy: "Vişne Serisi, tropikal canlılıkla klasik asaleti bir araya getirir. Botanik mekânlarda güçlü bir odak noktasıdır.", points: ["Konservatuarlar ve botanik köşeler için ideal", "Tropik bitkilerle zengin bir renk diyaloğu", "Kırmızı-kahve ton canlılık ve asaleti temsil eder", "Demir ve ahşap kombinasyonuyla endüstriyel his"] },
  33: { name: "Zeytin", slug: "masa-saati-zeytin", badge: "🫒 Akdeniz & Toprak", desc: "Zeytin ağacının yeşilimsi-gri tonlarından ilham alan bu seri Akdeniz'i masanıza taşır.", room: "minimalist bathroom shelf white towels plants", philosophy: "Zeytin Serisi, yüzyıllık zeytin ağaçlarının bilgeliğini ve Akdeniz'in sakinliğini yansıtır.", points: ["Banyo raflarında doğal ve ferah bir görünüm", "Beyaz havlu ve bitki köşesiyle mükemmel uyum", "Akdeniz estetiğiyle sade bir şıklık", "Su ve nem dayanımına uygun özel kaplama"] },
  34: { name: "Limon", slug: "masa-saati-limon", badge: "🍋 Ferah & Enerjik", desc: "Limon sarısının enerjisi açık ahşap tonuna işlenmiş. Sabahları masanıza ferahlatıcı bir enerji getirir.", room: "cozy reading corner armchair tray table knit blanket", philosophy: "Limon Serisi, okuma saatlerini canlandırır. Örgü battaniyenin yumuşaklığıyla beraber tazelik ve dinginliği dengeler.", points: ["Okuma köşeleri için enerjik ama sakin bir ton", "Sarı ve kahve renk uyumuyla sıcak his", "Kucakta sehpa veya yan sehpada şık görünüm", "Sabah kahvesiyle başlayan güzel bir ritüel"] },
  35: { name: "Gümüş", slug: "masa-saati-gumus", badge: "🥈 Parlak & Modern", desc: "Gümüşün soğuk parlaklığı açık ahşabın sıcaklığıyla dengeli bir uyum yaratır. Modern lükse özel bir form.", room: "florist shop wooden counter flowers around", philosophy: "Gümüş Serisi, çiçeklerin doğal güzelliği arasında mücevher gibi parlar. Floriste modern bir kimlik katar.", points: ["Çiçekçi ve botanik mekânlarda zarif bir detay", "Çiçeklerle renk uyumuyla göz alıcı kompozisyon", "Gümüş tonu modern ve premium his verir", "Düğün veya özel gün hediyeleri için ideal"] },
  36: { name: "Tunç", slug: "masa-saati-tunc", badge: "🔶 Antik & Kültürel", desc: "Antik tunç objelerden ilham alan koyu amber ve kırmızı kahverengi tonu. Tarihin derinliğini masanıza taşır.", room: "jewelry boutique glass display counter", philosophy: "Tunç Serisi, antik uygarlıkların değerli nesnelerini çağrıştırır. Mücevher sergilerinde değerli bir bağlam oluşturur.", points: ["Mücevher vitrini ve butiklerinde prestijli görünüm", "Cam ve ahşap kombinasyonuyla sofistike bir his", "Koyu amber ton değer ve özgünlük yansıtır", "Koleksiyonluk bir ürün olarak öne çıkar"] },
  37: { name: "İnci", slug: "masa-saati-inci", badge: "💎 Zarif & Değerli", desc: "İncinin saf ve ışıltılı güzelliğinden esinlenilmiş. Beyazımsı ve parlak ahşap yüzey masanıza inci gibi parlar.", room: "elegant dining room credenza candlelight", philosophy: "İnci Serisi, yemek odasının şık mobilyasını tamamlar. Mum ışığında sahte yıldız gibi parlar.", points: ["Yemek odası büfesi üzerinde sofistike bir detay", "Mum ve dolaylı ışıkta muazzam parlaklık", "Beyaz-krem tonlar şık bir sofra ambiyansı yaratır", "Özel yemekler için masa üstü dekorasyon olur"] },
  38: { name: "Çıra", slug: "masa-saati-cira", badge: "🔆 Işıklı & Canlı", desc: "Çıra ateşinin sarı-turuncu aydınlığı ahşabın damarlarında yaşıyor. Yaratıcı mekânlara enerji verir.", room: "tech startup open office standing desk", philosophy: "Çıra Serisi, startup enerjisini ve yaratıcılığı yansıtır. Ayakta çalışma masalarında motivasyon kaynağı olur.", points: ["Startup ve yaratıcı ofis ortamlarında enerji verir", "Standing desk kullanımı için ideal form", "Turuncu-sarı ton beyin fırtınasını tetikler", "Modern çalışma kültürünün sembolu"] },
  39: { name: "Kuzgun", slug: "masa-saati-kuzgun", badge: "🦅 Asil & Serbest", desc: "Kuzgunun gizemli siyah-koyu gri tonu ahşabın derinliğine yansımış. Asil ve özgür bir karakter.", room: "photographer's studio props table backdrops", philosophy: "Kuzgun Serisi, fotoğrafçının gözü gibi çarpıcı kontrastlar oluşturur. Stüdyoda her arka plana uyum sağlar.", points: ["Fotoğraf stüdyolarında çok yönlü bir prop", "Her arka plan rengiyle uyum sağlayan koyu ton", "Dramatik ve güçlü bir karakter yansıtır", "Ürün fotoğrafçıları için işlevsel bir detay"] },
  40: { name: "Güneş", slug: "masa-saati-gunes", badge: "☀️ Parlak & Pozitif", desc: "Güneş sarısının enerjisi ve sıcaklığı açık ahşap yüzeye işlenmiş. Her bakışta pozitif bir enerji patlar.", room: "tailor atelier wooden counter fabric rolls", philosophy: "Güneş Serisi, terzi atölyesinin ustalık gururunu aydınlatır. Kumaş ve ahşabın sıcak buluşmasını kutlar.", points: ["Atölye ve el sanatları mekânlarında mükemmel", "Kumaş ve doğal malzemelerle sıcak uyum", "Sarı-altın ton yaratıcı enerji yayar", "Ustalar için gurur verici bir masa detayı"] },
  41: { name: "Karanfil", slug: "masa-saati-karanfil", badge: "🌸 Baharatlı & Özel", desc: "Karanfilin yoğun ve baharatlı kırmızı tonu ahşabın damarlarında gizli. Özel bir aromanın görsel karşılığı.", room: "pottery studio clay-dusted wooden shelf", philosophy: "Karanfil Serisi, çömlek atölyesinin toprak renkleriyle mükemmel uyum sağlar. El sanatlarının tutkusunu kutlar.", points: ["Çömlek ve seramik atölyelerinde estetik uyum", "Toprak renkleriyle zengin bir ahşap diyaloğu", "Kırmızı-kahve ton tutkuyu ve sanatı yansıtır", "El sanatçılarına özel anlamlı bir hediye"] },
  42: { name: "Nane", slug: "masa-saati-nane", badge: "🌿 Ferah & Sağlıklı", desc: "Nane yeşilinin ferahlığı açık ahşabın doğallığıyla buluşuyor. Masanıza temiz hava eser.", room: "bookstore wooden counter paperbacks around", philosophy: "Nane Serisi, kitap sayfaları arasında derin nefes almayı hatırlatır. Kitabevlerinde ferah bir durak noktasıdır.", points: ["Kitabevi ve kütüphane sayaçlarında doğal his", "Kağıt ve ahşap malzemenin doğal uyumu", "Yeşil-doğal ton okumaya ilham verir", "Okuyuculara özel kişiselleştirilebilir hediye"] },
  43: { name: "Manolya", slug: "masa-saati-manolya", badge: "🌺 Asil & Beyaz", desc: "Manolyanın beyaz ve narin güzelliği açık ahşapta. Saf bir estetik, saflığın simgesi.", room: "architect's drafting table blueprints and tools", philosophy: "Manolya Serisi, tasarımın saflığını ve doğrululuğunu temsil eder. Mimarlık masasında ilham kaynağı olur.", points: ["Mimar ve tasarımcı masalarında ilham objesi", "Planlar ve araçlarla estetik bir denge kurar", "Beyaz-açık ton hassasiyeti ve temizliği simgeler", "Profesyonel mekânlarda sofistike bir karakter"] },
  44: { name: "Zümrüt", slug: "masa-saati-zumrut", badge: "💚 Derin & Değerli", desc: "Zümrüt yeşilinin derin ve koyu tonu ahşabın doğal liflerinde. Değerli bir taşın masaüstü yorumu.", room: "children's school classroom teacher's desk", philosophy: "Zümrüt Serisi, öğretmenin masasında bilginin ve büyümenin simgesi olur. Öğrencilere ilham verir.", points: ["Sınıf ve eğitim mekânlarında ilham verici", "Koyu yeşil ton büyümeyi ve öğrenmeyi simgeler", "Öğretmen günü için özel ve anlamlı hediye", "Lazer kazıma ile anlamlı bir mesaj bırakılabilir"] },
  45: { name: "Yakut", slug: "masa-saati-yakut", badge: "❤️ Tutkulu & Kırmızı", desc: "Yakut kırmızısının tutkulu tonu ahşabın derinliğinde parlıyor. Tutku ve sevgi masanızda canlı.", room: "vintage radio repair workshop wooden bench", philosophy: "Yakut Serisi, nostaljik ustalık ve kırmızı tutkuyu bir araya getirir. Vintage mekânlarda duygusal bir çekicilik yaratır.", points: ["Vintage ve antika mekânlarda nostaljik uyum", "Kırmızı-kahve ton tutku ve özgünlük yayar", "El işçiliği detayları vintage estetiğe katkı sağlar", "Koleksiyonculara özel nostaljik bir armağan"] },
  46: { name: "Firuze", slug: "masa-saati-firuze", badge: "🩵 Turquoise & Egzotik", desc: "Firuze taşının benzersiz turquoise-yeşil tonu ahşabın sıcaklığıyla egzotik bir buluşma yaratır.", room: "music studio mixing desk corner dim light", philosophy: "Firuze Serisi, müziğin ritmini ve yaratıcılığını yansıtır. Stüdyoda yaratıcı enerjinin bir parçası olur.", points: ["Müzik stüdyosu ve yaratıcı mekânlarda özgün", "Loş ışıkta ahşap doku büyülü bir parlaklık kazanır", "Egzotik renk yaratıcı zihni uyarır", "Müzisyen veya sanatçı için anlamlı hediye"] },
  47: { name: "Kumsal", slug: "masa-saati-kumsal", badge: "🏖️ Sahil & Özgür", desc: "Sahilin kum rengi ahşapta. Deniz esintisini ve özgürlük hissini masanıza taşır.", room: "fashion boutique wooden display surface", philosophy: "Kumsal Serisi, moda butiğinde sade bir lüks ifadesidir. Kumsal rengi zarif bir zemin hazırlar.", points: ["Moda butikleri ve showroomlarda sade bir lüks", "Bej-kum tonu ürünleri öne çıkaran nötr arka plan", "Sahil ve minimal stili sever", "Şık ambalajla premium hediye seçeneği"] },
  48: { name: "Şimşek", slug: "masa-saati-simsek", badge: "⚡ Hızlı & Enerjik", desc: "Şimşeğin ani parlaklığı ve enerjisi ahşabın damarlarına yansımış. Dinamik ve çarpıcı bir tasarım.", room: "whiskey distillery oak barrel shelf", philosophy: "Şimşek Serisi, viski firçınasının köklü ahşap ruhuyla buluşur. Meşe fıçının yanında güçlü bir kimlik taşır.", points: ["Viski distilerisi ve şaraphane mekânlarında ideal", "Meşe ve tahta tonlarıyla derin bir diyalog", "Koyu amber ton sertlik ve karakter yansıtır", "Koleksiyonculuk viski bar detayı olarak öne çıkar"] },
  49: { name: "Papatya", slug: "masa-saati-papatya", badge: "🌼 Saf & Neşeli", desc: "Papatyanın saf beyaz ve sarı tonları açık ahşabın doğallığıyla buluşuyor. Saf ve neşeli bir his.", room: "herbal apothecary wooden shelf glass jars", philosophy: "Papatya Serisi, doğal şifalı bitkilerin bulunduğu köşelerde aydınlatıcı bir enerji yayar.", points: ["Herbal ve doğal ürün mekânlarında doğal his", "Cam kavanozlar ve ahşap rafta mükemmel uyum", "Açık ve saf ton şifa enerjisini pekiştirir", "Doğal yaşam severlere özel bir hediye"] },
  50: { name: "Amber", slug: "masa-saati-amber-m", badge: "🍯 Bal & Sıcaklık", desc: "Bal renginin sıcaklığı ve iç aydınlığı. Amber Serisi, masaüstünde yaşayan bir güzellik sunar.", room: "penthouse apartment minimalist floating shelf", philosophy: "Amber Serisi, penthousenın yüksek estetiğini ahşabın toprak bağlantısıyla dengeler. Minimalizmin zirvesidir.", points: ["Penthouse ve prestijli mekânlarda öne çıkan detay", "Yüzer raflarda soyut bir sanat eseri gibi görünür", "Amber ton minimal tasarımı ısıtır", "Ultra lüks hediye seçeneği olarak dikkat çeker"] },
  51: { name: "Fırtına", slug: "masa-saati-firtina", badge: "🌩️ Güçlü & Çarpıcı", desc: "Fırtınanın gücü ve doğanın galeyanı ahşabın koyu damarlarında. Güçlü bir karakter ifadesi.", room: "outdoor garden party table fairy lights", philosophy: "Fırtına Serisi, peri ışıklarının altında dramatik bir güzellik sunar. Doğanın gücünü kutlar.", points: ["Dış mekân toplantı ve bahçe masalarında farklı bir detay", "Peri ışıklarıyla ahşabın dramatik görünümü", "Doğa temalı etkinliklerde ideal masa detayı", "Hediye paketi ile özel kutlama armağanı"] },
  52: { name: "Selvi", slug: "masa-saati-selvi", badge: "🌿 Dikeylik & Asalet", desc: "Servinin dikey ve asil duruşu bu masaüstü saatte yeniden doğuyor. Zarif ve bağımsız.", room: "private yacht cabin mahogany shelf", philosophy: "Selvi Serisi, özel yat kamaralarının maun raflarında asalet ve bağımsızlığı yansıtır.", points: ["Lüks yat ve tekne mekânlarında asil bir detay", "Maun ve koyu ahşaplarla uyumlu derin tonlar", "Denizde bile toprak bağlantısını koruyan his", "Özel sipariş lüks hediye seçeneği"] },
  53: { name: "Çiçek", slug: "masa-saati-cicek", badge: "🌸 Renk & Sevinç", desc: "Her mevsimde açan çiçeğin canlılığı ahşabın sıcaklığında. Masanıza mevsimsel bir neşe getirir.", room: "traditional Japanese tokonoma alcove", philosophy: "Çiçek Serisi, Japon wabi-sabi estetiğini yorumlar. Tokonoma nişinde sade ama derin bir güzellik sunar.", points: ["Japon ve Doğu estetiğiyle mükemmel uyum", "Tokonoma nişine özel kompakt boyut", "Çiçek temalı dekorasyonla estetik bütünlük", "Mevsimlik dekor değişimlerine uyumlu estetik"] },
  54: { name: "Bal", slug: "masa-saati-bal", badge: "🍯 Tatlı & Nostaljik", desc: "Balın tatlılığı ve altın rengi ahşabın sıcak tonlarında. Her bakışta tatlı bir his.", room: "French patisserie marble counter pastries", philosophy: "Bal Serisi, Fransız pastanelerinin tatlı lüksünü ahşabın doğallığıyla buluşturur. Şeker ve ağaç aynı kökleri paylaşır.", points: ["Pastane ve tatlı mekânlarında iştah açıcı bir detay", "Mermer tezgahla altın rengi güzel bir kontrast", "Tatlı mis kokuları eşliğinde mükemmel ambiyans", "Pasta ustasına özel kişiselleştirilebilir hediye"] },
  55: { name: "Dere", slug: "masa-saati-dere", badge: "💧 Akan & Doğal", desc: "Dağ deresinin berrak soğukluğu ve özgürlüğü masanıza taşınıyor. Doğal ve temiz bir his.", room: "mountain lodge fireplace mantel antlers", philosophy: "Dere Serisi, dağ evi şöminesiyle geyik boynuzları arasında doğanın saf sesini duyurur.", points: ["Dağ evi şöminesi üzerinde doğal güzellik", "Doğa malzemeleriyle mükemmel bir diyalog", "Koyu ahşap ateşin sıcaklığını yansıtır", "Dağ sever ruhuna özel kişisel bir armağan"] },
  56: { name: "Sis", slug: "masa-saati-sis", badge: "🌫️ Belirsiz & Gizemli", desc: "Sis gibi gizemli ve belirsiz. Gri-koyu tonlu ahşap yüzey ile masanıza derin bir sır hissi katar.", room: "urban rooftop bar concrete surface night view", philosophy: "Sis Serisi, şehir gecesinin beton yüzeyinde gizli bir derinlik sunar. Gece manzarasında mistik bir odak noktasıdır.", points: ["Kentsel rooftop bar ve gece mekânlarında etkileyici", "Beton ve sert yüzeylerle güçlü bir kontrast", "Gece ışıklarıyla büyüleyici görsel efekt", "Şehirli ruhlar için özel bir armağan"] },
  57: { name: "Yağmur", slug: "masa-saati-yagmur", badge: "🌧️ Ferahlatıcı & Romantik", desc: "Yağmurun bereketli damlalarını andıran ahşap damarlarıyla masanıza romantik bir yağmur havası gelir.", room: "Provençal farmhouse lavender linen table", philosophy: "Yağmur Serisi, Provence çiftliğinin lavanta kokusuyla buluşur. Romantik ve sakin bir yağmur günü atmosferi yaratır.", points: ["Kırsal ve çiftlik tarzı mekânlarla mükemmel", "Lavanta ve linen dokularıyla organik uyum", "Mavi-mor tonlar yağmur hissini güçlendirir", "Romantik hediye olarak özel anlamlara sahip"] },
  58: { name: "Ardıç", slug: "masa-saati-ardic", badge: "🌲 Aromatik & Sağlam", desc: "Ardıç ağacının koyu ve aromatik tonu masaüstünde egzotik bir his yaratır. Doğal koku ahşabın içinde.", room: "dark academia library oak desk brass lamp", philosophy: "Ardıç Serisi, Dark Academia estetiğinin ruhunu taşır. Pirinç lambası ve meşe masa arasında bilgeliği yansıtır.", points: ["Kütüphane ve akademik mekânlarda sofistike", "Pirinç ve meşe tonlarıyla klasik bir uyum", "Koyu ton ciddiyet ve derinliği simgeler", "Akademisyen ve düşünürlere özel bir hediye"] },
  59: { name: "Liköz", slug: "masa-saati-likoz", badge: "✨ Parlak & Ekzotik", desc: "Egzotik bir ağacın nadir renklerinden ilham alan yoğun ve derin ahşap tonu ile masanıza egzotizm getirir.", room: "modern gallery white cube shelf", philosophy: "Liköz Serisi, galeri küpünün beyaz yüzeyinde bir sanat eseri gibi teşhir edilmeyi hak eder.", points: ["Sanat galerisi ve modern sergi alanlarında mükemmel", "Beyaz küp galeri konseptiyle minimal uyum", "Koyu ekzotik ton dramatik bir odak yaratır", "Koleksiyonluk sanat eseri sınıfında sunum"] },
  60: { name: "Nilüfer", slug: "masa-saati-nilufer", badge: "🌸 Su & Zarafetle", desc: "Nilüferin su yüzeyindeki zarif duruşundan ilham alan bu seri, masaüstünde sıvı bir zarafet sunar.", room: "greenhouse shelf among orchids ferns", philosophy: "Nilüfer Serisi, seraya ait orkide ve eğreltiotu arasında açan bir çiçek gibi doğallıkla öne çıkar.", points: ["Sera ve botanik bahçe köşelerinde ideal", "Orkide ve tropikal bitkilerle estetik bütünlük", "Açık ahşap ton nemli ortamlarla uyumlu", "Çiçek sever ve doğa dostu ruhlara hediye"] },
  61: { name: "Menekşe", slug: "masa-saati-menekse", badge: "💜 Mor & Naif", desc: "Menekşenin zarif moru ahşabın sıcaklığıyla buluşuyor. Naif ve derin, mor-kahverengi bir romantizm.", room: "dental clinic reception oak counter", philosophy: "Menekşe Serisi, diş kliniğinin soğuk ortamına naif bir sıcaklık katar. Hastalara rahatlatıcı bir his verir.", points: ["Klinik ve medikal alım masalarında güven verir", "Meşe tonuyla kurumsal bir kimlik oluşturur", "Sıcak ahşap steril ortamı dengeler", "Hastaları karşılayan bir sakinlik yayar"] },
  62: { name: "Ardahan", slug: "masa-saati-ardahan", badge: "🏔️ Sert & Özgün", desc: "Doğu'nun sert doğası ve soğuk güzelliğinden ilham alan koyu ve güçlü bir ahşap tonu.", room: "law firm mahogany desk legal books", philosophy: "Ardahan Serisi, hukuk ofislerinin otoritesini pekiştirir. Meşe masa ve hukuk kitapları arasında güç ve adalet yayar.", points: ["Hukuk ofisi ve kurumsal mekânlarda otorite hissi", "Meşe masa ile klasik bir uyum", "Koyu ton kararlılık ve güvenilirliği yansıtır", "Hukuk mezuniyeti için özel kişiselleştirilebilir hediye"] },
  63: { name: "Orçid", slug: "masa-saati-orcid", badge: "🌺 Nadir & Muhteşem", desc: "Orkidenin nadir güzelliği ve egzotik tonu ahşabın sıcaklığında yeniden doğuyor. Nadir olanın şıklığı.", room: "chef's kitchen prep counter herbs spices", philosophy: "Orçid Serisi, şef mutfağının renkli ve aromalı zenginliğine güzel bir görsel dokunuş katar.", points: ["Şef mutfağı tezgahında lezzetli bir görsel detay", "Otlar ve baharatların yanında doğal estetik", "Canlı renk şef yaratıcılığını yansıtır", "Gurme ve aşçılara özel kişiselleştirilebilir hediye"] },
  64: { name: "Zakkum", slug: "masa-saati-zakkum", badge: "🌹 Güçlü & Çekici", desc: "Zakkumun güçlü ve çekici karakteri ahşabın derin tonlarında gizli. Hem tehlikeli hem büyüleyici.", room: "fashion designer flat lay marble desk", philosophy: "Zakkum Serisi, moda tasarımcısının yaratıcı masasında cesaret ve zarafeti bir araya getirir.", points: ["Moda ve yaratıcı tasarım mekânlarında güçlü duruş", "Mermer yüzey üzerinde dramatik kontrast", "Güçlü renk cesaret ve özgünlük yansıtır", "Tasarımcıya özel imzalı kişisel hediye"] },
  65: { name: "Ahlat", slug: "masa-saati-ahlat", badge: "🍐 Anadolu & Köklü", desc: "Anadolu'nun yabani armudundan ilham alan koyu sarı-amber tonu. Köklü ve özgün bir Anadolu ruhu.", room: "safari lodge teak shelf woven baskets", philosophy: "Ahlat Serisi, safari macerasının teak raflarında egzotik ve köklü bir Afrika-Anadolu buluşması yaratır.", points: ["Safari ve egzotik mekânlarda doğal uyum", "Teak ve sepet dokusuyla özgün bir bütünlük", "Amber ton macera ve keşif ruhunu yansıtır", "Gezgin ruhlara özel anlamlı bir hatıra"] },
  66: { name: "Ayaz", slug: "masa-saati-ayaz", badge: "🌬️ Soğuk & Berrak", desc: "Kış ayazının berraklığı ve soğuk temizliği açık ahşap tonuna sinmiş. Masanıza kış ferahlığı getirir.", room: "ski chalet wooden mantel snowflake decor", philosophy: "Ayaz Serisi, kayak şaletinin şömine üzerinde kartopu gibi beyaz bir zarafet sunar.", points: ["Kayak ve kış tatil mekânlarında mükemmel", "Kar beyazı dekorasyonuyla soğuk uyum", "Açık ton kış ışığını yansıtarak parlak görünür", "Kış tatili hediyesi olarak özel bir tercih"] },
  67: { name: "Nergis", slug: "masa-saati-nergis", badge: "🌼 Sarı & Bahar", desc: "Nergis çiçeğinin parlak sarısı ve beyazı açık ahşapta. Baharın gelişini masanıza taşır.", room: "tropical resort bamboo shelf ocean view", philosophy: "Nergis Serisi, tropikal gün batımında bambu rafında ışıl ışıl parlar. Okyanus manzarası ile altın sarısı ahşap: bir cennet karesi.", points: ["Tropikal tatil beldesi mekânlarında muhteşem", "Okyanus manzarasıyla altın rengi kontrast", "Bambu ve tropikal malzemelerle doğal uyum", "Tatil hediyesi olarak güneşli bir sürpriz"] },
  68: { name: "Ebegümeci", slug: "masa-saati-ebegumeci", badge: "🌺 Mor & Güzel", desc: "Ebegümecinin zarif moru ve sarısı ahşabın sıcaklığıyla bir araya geliyor. Beklenmedik bir güzellik.", room: "private library rolling ladder oak shelf", philosophy: "Ebegümeci Serisi, özel kütüphanenin meşe raflarında ender bir çiçek gibi açar. Kitap severler için sürpriz bir estetik.", points: ["Özel kütüphane ve okuma odalarında özgün detay", "Meşe ve klasik ahşap raflarla uyumlu ton", "Mor ve sarı enerji okuma odalarını canlandırır", "Kitap hediyesiyle birlikte mükemmel bir paket"] },
  69: { name: "Kavak", slug: "masa-saati-kavak", badge: "🌳 Hızlı & Yükselen", desc: "Kavakların hızlı büyümesinden ilham alan dikey ve dinamik tasarım. Yükselen bir enerji hissi.", room: "candle shop wooden counter wax wick", philosophy: "Kavak Serisi, mum dükkanının sıcak ışığında yükselen bir alev gibi görünür.", points: ["Mum ve ışık mağazalarında enerji yayıcı bir detay", "Sıcak mum ışığıyla ahşabın amber tonu buluşması", "Dikey form mum alevi estetiğini tamamlar", "Hediye mum setiyle birlikte özel bir paket"] },
  70: { name: "Karaçam", slug: "masa-saati-karacam", badge: "🌲 Koyu & Güçlü", desc: "Karaçamın koyu yeşil-siyah tonu ahşabın gücüyle birleşiyor. Sert doğanın kalın kabuğu masanıza kondu.", room: "ceramics gallery white pedestal clay textures", philosophy: "Karaçam Serisi, seramik galerinin beyaz kaidesinde kil dokusunun yanında güçlü bir kontrast oluşturur.", points: ["Seramik ve el sanatları galerilerinde özgün", "Beyaz kaide üzerinde koyu ahşabın dramatik etkisi", "Kil ve ahşap: iki doğal malzemenin diyaloğu", "Koleksiyonluk sanat eseri sunum hissi"] },
  71: { name: "Mehlika", slug: "masa-saati-mehlika", badge: "🌙 Zarif & Gizemli", desc: "Nadir ve zarif bir isim, nadir ve zarif bir tasarım. Gizemli koyu-açık ahşap kontrast.", room: "recording studio acoustic foam shelf corner", philosophy: "Mehlika Serisi, müzik stüdyosunun akustik köşelerinde gizemli bir güzellik yayar.", points: ["Müzik stüdyolarında atmosfer katkısı", "Akustik malzemeyle doğal ahşap uyumu", "Gizemli karanlık köşelerde ışık kaynağı gibi", "Müzisyenlere özel lazer kazıma ile kişiselleştirme"] },
  72: { name: "Boncuk", slug: "masa-saati-boncuk", badge: "🪬 Geleneksel & Renkli", desc: "Türk el sanatlarının renkli boncuk geleneğinden ilham alan bu seri, masaüstünde kültürel bir iz bırakır.", room: "flooring showroom parquet display", philosophy: "Boncuk Serisi, parke döşeme mağazasında ahşap yüzeyin çeşitliliğini kutlar. Her saat, her tahta gibi eşsizdir.", points: ["Ahşap ve döşeme showroomlarında mükemmel örnek", "Parke desenleriyle ahşabın çeşitliliği yansıtır", "Renk ve doku zenginliği koleksiyon ruhunu sunar", "El sanatları seven ruhlara özel bir hediye"] },
  73: { name: "Mahmur", slug: "masa-saati-mahmur", badge: "😴 Romantik & Uyuşuk", desc: "Mahmurun romantik ve uyuşuk halinin huzurlu estetiği. Masanıza yumuşak ve uysal bir his katar.", room: "wellness retreat stone shelf essential oils", philosophy: "Mahmur Serisi, wellness retreatında taş raf üzerinde esansiyel yağlarla birlikte ruhsal huzur yaratır.", points: ["Wellness ve sağlık merkezlerinde huzur verir", "Taş ve doğal malzemelerle organik bütünlük", "Esans ve aromaterapi mekânlarında sinerji", "Meditasyon ve yoga yapanlara özel hediye"] },
  74: { name: "Dağlarca", slug: "masa-saati-daglarca", badge: "⛰️ Şiirsel & Güçlü", desc: "Şair Fazıl Hüsnü Dağlarca'nın coğrafyasından ilham, dağların güçlü ruhunu taşıyan koyu ahşap.", room: "antique shop crowded wooden shelf old books", philosophy: "Dağlarca Serisi, antika dükkanının eski kitaplarla dolu raflarında tarihin sesini duyurur.", points: ["Antika ve eski eser mekânlarında nostaljik uyum", "Eski kitap ve ahşap dokusu ile derin diyalog", "Koyu ton tarihin ağırlığını yansıtır", "Edebiyat severlere özel kişiselleştirilebilir hediye"] },
  75: { name: "Taze", slug: "masa-saati-taze", badge: "🌱 Yeni & Canlı", desc: "Taze filizlerin açık yeşilimsi tonu ahşabın sıcaklığında. Yeni başlangıçların simgesi masanızda.", room: "modern reception desk hotel lobby marble", philosophy: "Taze Serisi, otel lobisinin mermer resepsiyon masasında yeni gelen her konuğa taze bir başlangıç sunar.", points: ["Otel ve butik konaklama resepsiyonlarında hoş geldin mesajı", "Mermer ve açık ahşap: taze ve sofistike uyum", "Açık ton mekânı aydınlatır ve ferahlatır", "Kişiselleştirme ile otel markasını yansıtabilir"] },
  76: { name: "Pınar", slug: "masa-saati-pinar", badge: "💧 Berrak & Temiz", desc: "Bir pınarın berraklığı ve temizliği açık ahşabın saflığında. Masanıza kristal bir netlik getirir.", room: "gift shop wicker basket display counter", philosophy: "Pınar Serisi, hediyelik eşya dükkanının sepet tezgahında pırıl pırıl bir berraklık sunar.", points: ["Hediyelik eşya ve butik mağazalarda cazip bir vitrin detayı", "Hasır sepet ile ahşabın doğal bütünlüğü", "Açık berrak ton her hediyeye umut mesajı katar", "Kişiselleştirme seçeneğiyle unutulmaz hediye"] },
  77: { name: "Sümbül", slug: "masa-saati-sumbul", badge: "💜 Mor & Mis", desc: "Sümbülün mis kokusu ve mor tonu ahşabın aromalarıyla birleşiyor. Görünür güzelliğin ötesinde duyusal bir his.", room: "upscale barber shop wooden shelf grooming tools", philosophy: "Sümbül Serisi, lüks berberhane rafında bakım ürünleri arasında sofistike bir karakter sunar.", points: ["Berber ve güzellik salonlarında şık bir detay", "Bakım ürünleri ile ahşabın doğal uyumu", "Mor ton özgüven ve şıklığı simgeler", "Erkeklere özel kişiselleştirilebilir hediye"] },
  78: { name: "Anka", slug: "masa-saati-anka-m", badge: "🦅 Yeniden Doğuş", desc: "Efsanevi anka kuşunun ateşten yeniden doğuşu gibi — her model eşsiz ve yenilenmez bir ruhla yaratılmıştır.", room: "minimalist home office desk natural light", philosophy: "Anka Serisi, sonsuz yenilenme ve özgünlük felsefesini taşır. Her saat bir anka gibi eşsiz ve bir daha tekrarlanamaz.", points: ["Her ortamda güçlü ve özgün bir kimlik", "Saf doğal ahşap her bakışta farklı bir yüz sunar", "Sessiz mekanizma sürekli bir devinimi simgeler", "Koleksiyoncular için özel sınırlı üretim ruhu"] },
  79: { name: "Elmas", slug: "masa-saati-elmas", badge: "💎 En Değerli", desc: "Koleksiyonun en değerli taşı. Elmas Serisi, masaüstü saatin zirvesindedir — hem estetik hem karakter.", room: "cozy wooden study room with bookshelves", philosophy: "Elmas Serisi, bir koleksiyonun son ve en kıymetli parçasıdır. Her ahşap lifire işlenmiş benzersizliğin doruk noktası.", points: ["Özel çalışma odalarında başlı başına bir sergi", "Kitaplık rafında koleksiyonun yıldızı", "Her açıdan farklı yansıma ve görsel zenginlik", "Hediyeler içinde en seçkin ve anlamlı tercih"] },
};

function generatePage(num, m) {
  const coverImg = `images/masa-saati/kapak-${m.slug.replace('masa-saati-','')}.jpg`;
  const prodImg = `images/masa-saati/Model ${num}/${num}.jpg`;
  const mekanImg = `images/masa-saati/Model ${num}/${num}-mekan.jpg`;

  return `<!doctype html>
<html lang="tr">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>"${m.name}" Serisi — Masif Ahşap Masa Saati | masif.</title>
  <meta name="description" content="${m.desc.slice(0,150)}"/>
  <link rel="canonical" href="https://www.masifspecial.com/masif-atolye/${m.slug}.html"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400;1,9..144,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="style.css"/>
  <link rel="stylesheet" href="product.css"/>
</head>
<body>
  <div class="page-loader" id="pageLoader"><div class="loader-logo">masif<span>.</span></div></div>
  <div class="nav-overlay" id="navOverlay"></div>
  <nav class="navbar" id="navbar">
    <div class="container">
      <a href="index.html" class="logo">masif<span>.</span></a>
      <ul class="nav-links" id="navLinks">
        <li><a href="index.html">Ana Sayfa</a></li>
        <li><a href="index.html#urunler" class="active">Ürünler</a></li>
        <li><a href="index.html#hakkimizda">Hakkımızda</a></li>
        <li><a href="index.html#magazalar">Mağazalar</a></li>
        <li><a href="index.html#iletisim">İletişim</a></li>
      </ul>
      <button class="menu-toggle" id="menuToggle" aria-label="Menü">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>

  <div class="product-breadcrumb">
    <div class="container">
      <a href="index.html">← Ana Sayfa</a>
      <span>/</span>
      <a href="ahsap-masa-saati.html">Masa Saatleri</a>
      <span>/</span>
      "${m.name}" Serisi
    </div>
  </div>

  <section class="product-hero">
    <div class="container">
      <div class="product-hero-inner">
        <div class="product-hero-info">
          <div class="product-hero-badge">${m.badge}</div>
          <h1>Masif Ahşap Masa Saati — <em>"${m.name}" Serisi</em></h1>
          <p class="product-hero-desc">${m.desc}</p>
          <div class="product-hero-cta">
            <a href="https://wa.me/905067786885" class="btn-primary" target="_blank">WhatsApp'tan Sipariş Ver ↗</a>
            <a href="#galeri" class="btn-outline">Görselleri İncele ↓</a>
          </div>
        </div>
        <div class="product-gallery">
          <div class="gallery-main" id="galleryMain">
            <img src="${coverImg}" alt='"${m.name}" Serisi Ahşap Masa Saati' id="galleryMainImg" style="width:100%;height:100%;object-fit:cover;cursor:pointer;" onclick="openLightbox('${coverImg}')"/>
          </div>
          <div class="gallery-thumbs">
            <div class="gallery-thumb active" onclick="switchGallery(this,'${coverImg}','img')">
              <img src="${coverImg}" alt="${m.name} Serisi kapak"/>
            </div>
            <div class="gallery-thumb" onclick="switchGallery(this,'${prodImg}','img')">
              <img src="${prodImg}" alt="${m.name} Serisi ürün" loading="lazy"/>
            </div>
          </div>
        </div>
      </div>

      <div class="features-grid reveal">
        <div class="feature-card">
          <div class="feature-icon">🌳</div>
          <div class="feature-metric">%100</div>
          <div class="feature-title">Doğal Kayın</div>
          <p class="feature-desc">Her saatin ahşap dokusu eşsizdir. Doğanın parmak izi.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">✍️</div>
          <div class="feature-metric">Sınırsız</div>
          <div class="feature-title">Kişiselleştirme</div>
          <p class="feature-desc">İsim, tarih veya logo — lazer kazıma ile kalıcı.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">📐</div>
          <div class="feature-metric">El Yapımı</div>
          <div class="feature-title">Özel Üretim</div>
          <p class="feature-desc">Her saat sipariş üzerine, tek tek el işçiliğiyle üretilir.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🔇</div>
          <div class="feature-metric">Sessiz</div>
          <div class="feature-title">Akar Mekanizma</div>
          <p class="feature-desc">Tik-tak sesi yok. Huzurlu bir çalışma ortamı için.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="content-section reveal" id="galeri">
    <div class="container">
      <div class="section-label">Ürün Galerisi</div>
      <h2>"${m.name}" Serisi <em>Görseller</em></h2>
      <div class="img-grid-3" style="margin-top:2rem;">
        <div class="img-card">
          <img src="${coverImg}" alt="${m.name} Serisi iç mekân" loading="lazy" data-lightbox="${coverImg}"/>
        </div>
        <div class="img-card">
          <img src="${prodImg}" alt="${m.name} Serisi ürün detayı" loading="lazy" data-lightbox="${prodImg}"/>
        </div>
      </div>
    </div>
  </section>

  <section class="content-section reveal">
    <div class="container">
      <div class="split-layout">
        <div>
          <div class="section-label">Tasarım Felsefesi</div>
          <h2>"${m.name}" <em>Ruhu</em></h2>
          <p style="color:var(--text-secondary);line-height:1.8;margin-bottom:1.5rem;">${m.philosophy}</p>
          <ul class="icon-list">
            ${m.points.map(p => `<li><span style="color:var(--accent);">→</span> ${p}</li>`).join('\n            ')}
          </ul>
        </div>
        <div>
          <div class="section-label">Teknik Özellikler</div>
          <h2>Ürün <em>Detayları</em></h2>
          <table class="specs-table">
            <tr><th>Malzeme</th><td>%100 kayın ağacı</td></tr>
            <tr><th>Form</th><td>Kemerli masaüstü saat</td></tr>
            <tr><th>Kadran</th><td>Saat modeline göre değişir</td></tr>
            <tr><th>Kişiselleştirme</th><td>Lazer kazıma (opsiyonel)</td></tr>
            <tr><th>Mekanizma</th><td>Sessiz akar saniye</td></tr>
            <tr><th>Pil</th><td>1× AA (dahil değildir)</td></tr>
          </table>
        </div>
      </div>
    </div>
  </section>

  <div class="container">
    <div class="cta-band reveal">
      <h2>"${m.name}" Serisi Sipariş Ver</h2>
      <p>Kişiselleştirme tercihlerinizi bildirin, size özel üretelim.</p>
      <div class="cta-buttons">
        <a href="https://wa.me/905067786885" class="btn-primary" target="_blank">WhatsApp'tan Yazın ↗</a>
        <a href="ahsap-masa-saati.html" class="btn-outline">← Diğer Modeller</a>
      </div>
    </div>
  </div>

  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="logo">masif<span>.</span></a>
          <p>Doğal masif ahşaptan, el işçiliğiyle üretilen premium tasarım ürünleri.</p>
        </div>
        <div class="footer-col">
          <h4>Hızlı Linkler</h4>
          <a href="index.html">Ana Sayfa</a>
          <a href="index.html#urunler">Ürünler</a>
          <a href="index.html#iletisim">İletişim</a>
        </div>
        <div class="footer-col">
          <h4>Masa Saatleri</h4>
          <a href="masa-saati-akasya.html">"Akasya" Serisi</a>
          <a href="masa-saati-servi.html">"Servi" Serisi</a>
          <a href="masa-saati-mese.html">"Meşe" Serisi</a>
          <a href="ahsap-masa-saati.html">Tüm Modeller →</a>
        </div>
        <div class="footer-col">
          <h4>Mağazalar</h4>
          <a href="https://www.shopier.com/masiftasarimahsap" target="_blank" rel="noopener noreferrer">Shopier</a>
          <a href="https://masifspecial.etsy.com" target="_blank" rel="noopener noreferrer">Etsy</a>
          <a href="https://www.hepsiburada.com/magaza/masifspecial" target="_blank" rel="noopener noreferrer">Hepsiburada</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 masif. Tüm hakları saklıdır.</p>
      </div>
    </div>
  </footer>

  <div class="lightbox" id="lightbox">
    <button class="lightbox-close" id="lightboxClose">&times;</button>
    <img src="" alt="" id="lightboxImg"/>
  </div>

  <script src="script.js"></script>
  <script>
    function switchGallery(thumb, src, type) {
      document.querySelectorAll('.gallery-thumb').forEach(function(t) { t.classList.remove('active'); });
      thumb.classList.add('active');
      var main = document.getElementById('galleryMain');
      main.innerHTML = '<img src="' + src + '" alt="${m.name} Serisi" style="width:100%;height:100%;object-fit:cover;cursor:pointer;" onclick="openLightbox(\\'' + src + '\\')" />';
    }
    function openLightbox(src) {
      document.getElementById('lightboxImg').src = src;
      document.getElementById('lightbox').classList.add('active');
    }
    document.querySelectorAll('[data-lightbox]').forEach(function(el) {
      el.style.cursor = 'pointer';
      el.addEventListener('click', function() { openLightbox(this.dataset.lightbox); });
    });
    document.getElementById('lightboxClose').addEventListener('click', function() {
      document.getElementById('lightbox').classList.remove('active');
    });
    document.getElementById('lightbox').addEventListener('click', function(e) {
      if (e.target === this) this.classList.remove('active');
    });
  </script>
  <script src="chatbot.js"></script>
</body>
</html>`;
}

// Generate all 79 pages
let created = 0;
for (const [numStr, m] of Object.entries(MODELS)) {
  const num = parseInt(numStr);
  const filePath = path.join(ATOLYE, `${m.slug}.html`);
  fs.writeFileSync(filePath, generatePage(num, m));
  created++;
}
console.log(`Created ${created} product pages.`);

// Output model cards JSON for ahsap-masa-saati.html update
const cards = Object.entries(MODELS).map(([num, m]) => ({
  num: parseInt(num),
  name: m.name,
  slug: m.slug,
  badge: m.badge,
  desc: m.desc.slice(0, 80) + '...',
  cover: `images/masa-saati/kapak-${m.slug.replace('masa-saati-','')}.jpg`,
}));
fs.writeFileSync(path.join(ATOLYE, '_masa_cards.json'), JSON.stringify(cards, null, 2));
console.log('Saved _masa_cards.json');

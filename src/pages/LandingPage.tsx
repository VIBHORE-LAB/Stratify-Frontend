import { Link } from "react-router-dom";
import { features } from "../mockdata/Features";
import Hero from "../assets/Hero.jpg";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

export default function LandingPage(): React.ReactNode {
  return (
    <div className="w-full bg-black">  
      

      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-black/70" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${Hero})` }}
        />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-5xl mx-auto text-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Backtest Your
                <span className="text-green-300 bg-clip-text bg-gradient-trading block mt-2">
                  Trading Strategies
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                Test your trading strategies with real historical stock data.
                Analyze performance, optimize parameters, and validate your
                approach with professional-grade tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button
                  variant="default"
                  className="bg-gradient-to-r from-green-400 to-teal-400 text-2xl font-medium text-black hover:shadow-glow px-10 py-4 h-auto"
                  asChild
                >
                  <Link to="/register">Get Started Free</Link>
                </Button>

                <Button
                  variant="outline"
                  className="!border-green-400 text-green-400 text-2xl font-bold bg-transparent hover:!border-green-700 hover:!text-white px-10 py-4 h-auto"
                  asChild
                >
                  <Link to="/dashboard">View Demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ////// Features Section ////// */}
      <section className="py-20 bg-black"> {/* 🔥 ensure pure black background */}
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Professional Trading Tools
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Everything you need to validate and optimize your trading strategies like a pro
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="trading-card-hover group animate-scale-in bg-black border border-gray-800" // 🔥 black card with subtle border
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-4">
                  <div className="relative inline-block">
                    <feature.icon className="h-12 w-12 text-green-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-green-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

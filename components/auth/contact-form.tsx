"use client";

import { useRouter } from "next/navigation";
import CardWrapper from "./card-wrapper";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Home, Mail, Linkedin } from "lucide-react";

// Form validation schema
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const ContactMeForm = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      phoneNumber: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setSuccessMessage("");
    setError("");

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccessMessage("I would contact you asap! It's going to be great.");
        form.reset();
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <CardWrapper
      label="Let's Get Connected"
      title="Contact Me"
      backButtonHref="/app/page"
      backButtonLabel="Go to Home"
    >
      <div className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="John Doe" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="johndoe@example.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" placeholder="+1 (234) 567-8900" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Details</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="Would you like to add any detail...?"
                      className="min-h-[100px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && (
              <p className="text-sm font-medium text-red-500 text-center">{error}</p>
            )}
            
            {successMessage && (
              <p className="text-sm font-medium text-green-500 text-center">{successMessage}</p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </Form>
        
        {/* Navigation buttons with icons */}
        <div className="flex gap-4 justify-center">
          <Button 
            onClick={handleGoHome}
            className="flex-1"
            variant="outline"
          >
            <Home className="w-4 h-4" />
          </Button>
          <Button 
            onClick={() => window.location.href = 'mailto:your.email@example.com'}
            className="flex-1"
            variant="outline"
          >
            <Mail className="w-4 h-4" />
          </Button>
          <Button 
            onClick={() => window.open('https://www.linkedin.com/in/utkarshsinghrajput23/', '_blank')}
            className="flex-1"
            variant="outline"
          >
            <Linkedin className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </CardWrapper>
  );
};

export default ContactMeForm;